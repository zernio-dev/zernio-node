import { describe, it, expect, vi } from 'vitest';
import {
  ZernioApiError,
  LateApiError,
  RateLimitError,
  ValidationError,
  parseApiError,
} from '../src/errors';

describe('ZernioApiError', () => {
  it('should create error with all properties', () => {
    const error = new ZernioApiError('Test error', 400, 'test_code', {
      foo: 'bar',
    });
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('test_code');
    expect(error.details).toEqual({ foo: 'bar' });
    expect(error.name).toBe('ZernioApiError');
  });

  it('should check rate limited status', () => {
    const rateLimited = new ZernioApiError('Rate limited', 429);
    const notRateLimited = new ZernioApiError('Bad request', 400);

    expect(rateLimited.isRateLimited()).toBe(true);
    expect(notRateLimited.isRateLimited()).toBe(false);
  });

  it('should check auth error status', () => {
    const authError = new ZernioApiError('Unauthorized', 401);
    const notAuthError = new ZernioApiError('Bad request', 400);

    expect(authError.isAuthError()).toBe(true);
    expect(notAuthError.isAuthError()).toBe(false);
  });

  it('should check forbidden status', () => {
    const forbidden = new ZernioApiError('Forbidden', 403);
    const notForbidden = new ZernioApiError('Bad request', 400);

    expect(forbidden.isForbidden()).toBe(true);
    expect(notForbidden.isForbidden()).toBe(false);
  });

  it('should check not found status', () => {
    const notFound = new ZernioApiError('Not found', 404);
    const found = new ZernioApiError('Bad request', 400);

    expect(notFound.isNotFound()).toBe(true);
    expect(found.isNotFound()).toBe(false);
  });

  it('should check validation error status', () => {
    const validationError = new ZernioApiError('Bad request', 400);
    const serverError = new ZernioApiError('Server error', 500);

    expect(validationError.isValidationError()).toBe(true);
    expect(serverError.isValidationError()).toBe(false);
  });

  it('should check payment required status', () => {
    const paymentRequired = new ZernioApiError('Payment required', 402);
    const notPaymentRequired = new ZernioApiError('Bad request', 400);

    expect(paymentRequired.isPaymentRequired()).toBe(true);
    expect(notPaymentRequired.isPaymentRequired()).toBe(false);
  });

  it('should be instanceof Error', () => {
    const error = new ZernioApiError('Test', 400);
    expect(error instanceof Error).toBe(true);
    expect(error instanceof ZernioApiError).toBe(true);
  });

  it('LateApiError should be an alias for ZernioApiError', () => {
    expect(LateApiError).toBe(ZernioApiError);
    const error = new LateApiError('Test', 400);
    expect(error instanceof ZernioApiError).toBe(true);
  });
});

describe('RateLimitError', () => {
  it('should create error with rate limit info', () => {
    const resetAt = new Date('2025-01-01T00:00:00Z');
    const error = new RateLimitError('Rate limited', 100, 0, resetAt);

    expect(error.message).toBe('Rate limited');
    expect(error.statusCode).toBe(429);
    expect(error.code).toBe('rate_limit_exceeded');
    expect(error.name).toBe('RateLimitError');
    expect(error.limit).toBe(100);
    expect(error.remaining).toBe(0);
    expect(error.resetAt).toBe(resetAt);
  });

  it('should calculate seconds until reset', () => {
    const now = Date.now();
    const resetAt = new Date(now + 60000); // 60 seconds from now
    const error = new RateLimitError('Rate limited', 100, 0, resetAt);

    const seconds = error.getSecondsUntilReset();
    expect(seconds).toBeGreaterThanOrEqual(59);
    expect(seconds).toBeLessThanOrEqual(61);
  });

  it('should return 0 if reset time is in past', () => {
    const resetAt = new Date(Date.now() - 1000); // 1 second ago
    const error = new RateLimitError('Rate limited', 100, 0, resetAt);

    expect(error.getSecondsUntilReset()).toBe(0);
  });

  it('should return undefined if no reset time', () => {
    const error = new RateLimitError('Rate limited');
    expect(error.getSecondsUntilReset()).toBeUndefined();
  });

  it('should be instanceof ZernioApiError', () => {
    const error = new RateLimitError('Rate limited');
    expect(error instanceof ZernioApiError).toBe(true);
    expect(error instanceof RateLimitError).toBe(true);
  });
});

describe('ValidationError', () => {
  it('should create error with field errors', () => {
    const fields = {
      content: ['Content is required'],
      platforms: ['At least one platform is required'],
    };
    const error = new ValidationError('Validation failed', fields);

    expect(error.message).toBe('Validation failed');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('validation_error');
    expect(error.name).toBe('ValidationError');
    expect(error.fields).toEqual(fields);
  });

  it('should be instanceof ZernioApiError', () => {
    const error = new ValidationError('Validation failed');
    expect(error instanceof ZernioApiError).toBe(true);
    expect(error instanceof ValidationError).toBe(true);
  });
});

describe('parseApiError', () => {
  function createMockResponse(
    status: number,
    statusText: string,
    headers: Record<string, string> = {}
  ): Response {
    return {
      status,
      statusText,
      headers: {
        get: (name: string) => headers[name] || null,
      },
    } as Response;
  }

  it('should parse basic error response', () => {
    const response = createMockResponse(400, 'Bad Request');
    const body = { error: 'Invalid request', code: 'invalid_request' };

    const error = parseApiError(response, body);

    expect(error.message).toBe('Invalid request');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('invalid_request');
  });

  it('should use message field if error is not present', () => {
    const response = createMockResponse(400, 'Bad Request');
    const body = { message: 'Error message' };

    const error = parseApiError(response, body);

    expect(error.message).toBe('Error message');
  });

  it('should use statusText as fallback', () => {
    const response = createMockResponse(400, 'Bad Request');

    const error = parseApiError(response, {});

    expect(error.message).toBe('Bad Request');
  });

  it('should parse rate limit error with headers', () => {
    const response = createMockResponse(429, 'Too Many Requests', {
      'X-RateLimit-Limit': '100',
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 60),
    });
    const body = { error: 'Rate limit exceeded' };

    const error = parseApiError(response, body);

    expect(error instanceof RateLimitError).toBe(true);
    expect(error.message).toBe('Rate limit exceeded');
    if (error instanceof RateLimitError) {
      expect(error.limit).toBe(100);
      expect(error.remaining).toBe(0);
      expect(error.resetAt).toBeInstanceOf(Date);
    }
  });

  it('should parse validation error with fields', () => {
    const response = createMockResponse(400, 'Bad Request');
    const body = {
      error: 'Validation failed',
      details: {
        fields: {
          content: ['Content is required'],
        },
      },
    };

    const error = parseApiError(response, body);

    expect(error instanceof ValidationError).toBe(true);
    if (error instanceof ValidationError) {
      expect(error.fields).toEqual({ content: ['Content is required'] });
    }
  });

  it('should handle missing body', () => {
    const response = createMockResponse(500, 'Internal Server Error');

    const error = parseApiError(response);

    expect(error.message).toBe('Internal Server Error');
    expect(error.statusCode).toBe(500);
  });
});

// Reported by an integrator on 2026-09-14 and first raised 57 releases earlier:
// parseApiError built ZernioApiError from error/code/details only, so of the
// seven canonical envelope fields, type, param, platform and platformError were
// dropped on EVERY endpoint. For Meta sends that is fatal to error handling,
// because a closed messaging window and a blocked recipient both arrive as
// code platform_api_error and only platformError.subcode separates them.
describe('parseApiError carries the whole envelope', () => {
  const metaBody = {
    error: 'This message is sent outside of allowed window.',
    type: 'platform_error',
    code: 'platform_api_error',
    param: 'text',
    docUrl: 'https://docs.zernio.com/errors/platform_api_error',
    platform: 'instagram',
    platformError: { code: 10, subcode: 2534022, fbtrace_id: 'Abc123' },
    details: { conversationId: 'c1' },
  };

  it('surfaces type, param, docUrl, platform and platformError', () => {
    const err = parseApiError(new Response(null, { status: 403 }), metaBody);
    expect(err.type).toBe('platform_error');
    expect(err.param).toBe('text');
    expect(err.docUrl).toBe('https://docs.zernio.com/errors/platform_api_error');
    expect(err.platform).toBe('instagram');
    expect(err.platformError).toEqual({ code: 10, subcode: 2534022, fbtrace_id: 'Abc123' });
  });

  it('keeps the subcode that separates one Meta refusal from another', () => {
    const err = parseApiError(new Response(null, { status: 403 }), metaBody);
    expect((err.platformError as { subcode?: number })?.subcode).toBe(2534022);
  });

  it('attaches the parsed body verbatim for anything not modelled', () => {
    const err = parseApiError(new Response(null, { status: 403 }), metaBody);
    expect(err.body).toEqual(metaBody);
  });

  it('still fills the fields it always did', () => {
    const err = parseApiError(new Response(null, { status: 403 }), metaBody);
    expect(err.message).toBe(metaBody.error);
    expect(err.statusCode).toBe(403);
    expect(err.code).toBe('platform_api_error');
    expect(err.details).toEqual({ conversationId: 'c1' });
  });

  it('carries the envelope through a 429 too, keeping the API-sent code', () => {
    const err = parseApiError(new Response(null, { status: 429 }), {
      error: 'Google Ads API error (429): Too many requests.',
      type: 'rate_limit_error',
      code: 'rate_limited',
      details: { quotaExhausted: true, quotaScope: 'DEVELOPER' },
    });
    expect(err.code).toBe('rate_limited');
    expect(err.type).toBe('rate_limit_error');
    expect(err.details).toEqual({ quotaExhausted: true, quotaScope: 'DEVELOPER' });
  });

  it('carries the envelope through a 400 validation error', () => {
    const err = parseApiError(new Response(null, { status: 400 }), {
      error: 'Invalid field',
      type: 'invalid_request_error',
      code: 'invalid_field_value',
      param: 'targeting.customLocations',
      details: { fields: { foo: ['bad'] } },
    });
    expect(err.param).toBe('targeting.customLocations');
    expect(err.type).toBe('invalid_request_error');
  });

  it('leaves the new fields undefined when the API sent no body', () => {
    const err = parseApiError(new Response(null, { status: 500 }));
    expect(err.type).toBeUndefined();
    expect(err.docUrl).toBeUndefined();
    expect(err.platformError).toBeUndefined();
    expect(err.statusCode).toBe(500);
  });
});
