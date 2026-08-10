import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Zernio from '../src';

/**
 * `_bind` injects the per-instance client into each operation's options under
 * the `client` key, and @hey-api/client-fetch spreads the whole per-request
 * options object into the fetch `RequestInit`. Node's undici ignores unknown
 * init fields, but Deno defines its own `client` init option (a
 * `Deno.HttpClient`) and validates it, so `new Request(...)` throws and every
 * SDK call fails on Deno, Deno Deploy, and Supabase Edge Functions
 * (hey-api upstream: https://github.com/hey-api/hey-api/issues/4177).
 *
 * These tests run under Node, so they capture the init at `new Request` time —
 * undici would otherwise silently swallow the stray field and hide the bug.
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

  it('never leaks the client selector into the fetch RequestInit', async () => {
    const client = new Zernio({ apiKey: 'sk_test' });

    await client.accounts.listAccounts({});

    expect(capturedInits.length).toBeGreaterThan(0);
    for (const init of capturedInits) {
      expect(init && 'client' in init).toBe(false);
    }
  });

  it('still routes through the per-instance client (auth header is applied)', async () => {
    const authHeaders: (string | null)[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      authHeaders.push((input as Request).headers.get('Authorization'));
      return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
    }) as unknown as typeof fetch;

    const client = new Zernio({ apiKey: 'sk_ABCD' });
    await client.accounts.listAccounts({});

    expect(authHeaders).toEqual(['Bearer sk_ABCD']);
  });

  it('keeps per-instance isolation between two clients', async () => {
    const authHeaders: (string | null)[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      authHeaders.push((input as Request).headers.get('Authorization'));
      return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
    }) as unknown as typeof fetch;

    const first = new Zernio({ apiKey: 'sk_FIRST' });
    const second = new Zernio({ apiKey: 'sk_SECOND' });
    await first.accounts.listAccounts({});
    await second.accounts.listAccounts({});
    await first.accounts.listAccounts({});

    expect(authHeaders).toEqual(['Bearer sk_FIRST', 'Bearer sk_SECOND', 'Bearer sk_FIRST']);
  });
});
