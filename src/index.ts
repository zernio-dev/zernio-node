/**
 * Zernio - Official Node.js library for the Zernio API
 *
 * @example
 * ```typescript
 * import Zernio from '@zernio/node';
 *
 * const zernio = new Zernio();
 *
 * const post = await zernio.posts.create({
 *   body: {
 *     content: 'Hello world!',
 *     platforms: [{ platform: 'twitter', accountId: 'acc_123' }],
 *     publishNow: true,
 *   },
 * });
 * ```
 *
 * @packageDocumentation
 */

// Main client export (Zernio is primary, Late is kept for backwards compatibility)
export { Zernio, Zernio as default, Late, type ClientOptions } from './client';

// Error exports (ZernioApiError is primary, LateApiError is kept for backwards compatibility)
export {
  ZernioApiError,
  LateApiError,
  RateLimitError,
  ValidationError,
  parseApiError,
} from './errors';

// Re-export generated types for advanced usage
export * from './generated/types.gen';
