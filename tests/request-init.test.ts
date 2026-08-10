import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Zernio from '../src';

/**
 * `_bind` injects this instance's client under the `client` key so each call
 * runs on the right per-instance client. @hey-api/client-fetch then spreads the
 * whole per-request options object into the fetch `RequestInit`. Node's undici
 * ignores unknown init fields, but Deno (and other WinterCG runtimes) reject a
 * `client` that is not a `Deno.HttpClient` — `new Request(...)` throws and every
 * call fails under Deno Deploy, Supabase Edge Functions, Cloudflare Workers.
 *
 * This asserts the selector never reaches the RequestInit. It runs under Node,
 * so it captures the init at `new Request` time (undici would otherwise silently
 * swallow the stray field and hide the bug).
 */
describe('request construction (Deno / WinterCG compatibility)', () => {
  const OriginalRequest = globalThis.Request;
  const originalFetch = globalThis.fetch;
  let capturedInits: (RequestInit | undefined)[];

  beforeEach(() => {
    capturedInits = [];
    globalThis.Request = class extends OriginalRequest {
      constructor(input: RequestInfo | URL, init?: RequestInit) {
        capturedInits.push(init);
        super(input, init);
      }
    } as unknown as typeof Request;
    globalThis.fetch = vi.fn(
      async () =>
        new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.Request = OriginalRequest;
    globalThis.fetch = originalFetch;
  });

  it('never leaks the internal client into the fetch RequestInit', async () => {
    const client = new Zernio({ apiKey: 'sk_test' });

    await client.accounts.listAccounts({});

    expect(capturedInits.length).toBeGreaterThan(0);
    for (const init of capturedInits) {
      expect(init && 'client' in init).toBe(false);
    }
  });

  it('still selects the per-instance client (auth header is applied)', async () => {
    const authHeaders: (string | null)[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      authHeaders.push((input as Request).headers.get('Authorization'));
      return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
    }) as unknown as typeof fetch;

    const client = new Zernio({ apiKey: 'sk_ABCD' });
    await client.accounts.listAccounts({});

    expect(authHeaders).toEqual(['Bearer sk_ABCD']);
  });
});
