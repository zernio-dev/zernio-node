/**
 * Base error class for Zernio API errors
 */
/**
 * The canonical error envelope the API returns. Everything but `error` is
 * optional, and every field is surfaced on ZernioApiError: dropping any of them
 * leaves callers unable to tell apart failures the API distinguishes. For a
 * Meta pass-through in particular, `platformError.subcode` is the only thing
 * that separates a closed messaging window from a blocked recipient, since both
 * arrive as code `platform_api_error`.
 */
export interface ZernioErrorBody {
  error?: string;
  message?: string;
  type?: string;
  code?: string;
  param?: string;
  docUrl?: string;
  platform?: string;
  platformError?: Record<string, unknown>;
  details?: Record<string, unknown>;
}

export class ZernioApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: Record<string, unknown>;
  /** Error class, e.g. invalid_request_error, platform_error, rate_limit_error. */
  public readonly type?: string;
  /** The request field that caused the error, when the API names one. */
  public readonly param?: string;
  /** Link to the documentation for this error, when the API provides one. */
  public readonly docUrl?: string;
  /** Upstream platform, present when type is platform_error. */
  public readonly platform?: string;
  /** The upstream platform's own payload, verbatim (Meta: code, subcode, fbtrace_id). */
  public readonly platformError?: Record<string, unknown>;
  /** The parsed response body exactly as the API sent it, for anything not modelled above. */
  public readonly body?: ZernioErrorBody;

  constructor(
    message: string,
    statusCode: number,
    code?: string,
    details?: Record<string, unknown>,
    body?: ZernioErrorBody
  ) {
    super(message);
    this.name = 'ZernioApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.type = body?.type;
    this.param = body?.param;
    this.docUrl = body?.docUrl;
    this.platform = body?.platform;
    this.platformError = body?.platformError;
    this.body = body;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ZernioApiError);
    }
  }

  /**
   * Check if this is a rate limit error
   */
  isRateLimited(): boolean {
    return this.statusCode === 429;
  }

  /**
   * Check if this is an authentication error
   */
  isAuthError(): boolean {
    return this.statusCode === 401;
  }

  /**
   * Check if this is a permission/access error
   */
  isForbidden(): boolean {
    return this.statusCode === 403;
  }

  /**
   * Check if this is a not found error
   */
  isNotFound(): boolean {
    return this.statusCode === 404;
  }

  /**
   * Check if this is a validation error
   */
  isValidationError(): boolean {
    return this.statusCode === 400;
  }

  /**
   * Check if this is a payment required error
   */
  isPaymentRequired(): boolean {
    return this.statusCode === 402;
  }
}

/** @deprecated Use ZernioApiError instead */
export const LateApiError = ZernioApiError;

/**
 * Rate limit error with additional rate limit info
 */
export class RateLimitError extends ZernioApiError {
  public readonly limit?: number;
  public readonly remaining?: number;
  public readonly resetAt?: Date;

  constructor(
    message: string,
    limit?: number,
    remaining?: number,
    resetAt?: Date,
    body?: ZernioErrorBody
  ) {
    // The envelope's own code wins when the API sent one: a Google Ads quota
    // 429 and a Zernio rate limit are different failures.
    super(message, 429, body?.code ?? 'rate_limit_exceeded', body?.details, body);
    this.name = 'RateLimitError';
    this.limit = limit;
    this.remaining = remaining;
    this.resetAt = resetAt;
  }

  /**
   * Get seconds until rate limit resets
   */
  getSecondsUntilReset(): number | undefined {
    if (!this.resetAt) return undefined;
    return Math.max(0, Math.ceil((this.resetAt.getTime() - Date.now()) / 1000));
  }
}

/**
 * Validation error with field-specific details
 */
export class ValidationError extends ZernioApiError {
  public readonly fields?: Record<string, string[]>;

  constructor(message: string, fields?: Record<string, string[]>, body?: ZernioErrorBody) {
    super(message, 400, body?.code ?? 'validation_error', body?.details ?? { fields }, body);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

/**
 * Parse an error response from the API
 */
export function parseApiError(
  response: Response,
  body?: ZernioErrorBody
): ZernioApiError {
  const message = body?.error || body?.message || response.statusText || 'Unknown error';
  const code = body?.code;
  const details = body?.details;

  // Handle rate limit errors
  if (response.status === 429) {
    const limit = response.headers.get('X-RateLimit-Limit');
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');

    return new RateLimitError(
      message,
      limit ? parseInt(limit, 10) : undefined,
      remaining ? parseInt(remaining, 10) : undefined,
      reset ? new Date(parseInt(reset, 10) * 1000) : undefined,
      body
    );
  }

  // Handle validation errors
  if (response.status === 400 && details?.fields) {
    return new ValidationError(message, details.fields as Record<string, string[]>, body);
  }

  return new ZernioApiError(message, response.status, code, details, body);
}
