import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Zernio from '../src';

/**
 * Every Zernio instance must carry its own credentials. Interceptors used to be
 * registered on a module-global client, so the last-constructed key won for all
 * in-flight requests and one tenant's call could go out with another tenant's
 * token.
 */
describe('client isolation', () => {
  const originalFetch = globalThis.fetch;
  let authHeaders: (string | null)[];
  let urls: string[];

  beforeEach(() => {
    authHeaders = [];
    urls = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const request = input as Request;
      authHeaders.push(request.headers.get('Authorization'));
      urls.push(request.url);
      return new Response(JSON.stringify({ accounts: [] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('sends each instance its own API key', async () => {
    const a = new Zernio({ apiKey: 'sk_AAAA' });
    const b = new Zernio({ apiKey: 'sk_BBBB' });

    await a.accounts.listAccounts({});
    await b.accounts.listAccounts({});

    expect(authHeaders).toEqual(['Bearer sk_AAAA', 'Bearer sk_BBBB']);
  });

  it('keeps the earlier instance working after a later one is constructed', async () => {
    const a = new Zernio({ apiKey: 'sk_AAAA' });
    new Zernio({ apiKey: 'sk_BBBB' });

    await a.accounts.listAccounts({});

    expect(authHeaders).toEqual(['Bearer sk_AAAA']);
  });

  it('does not stack one interceptor per instance', async () => {
    for (let i = 0; i < 25; i++) new Zernio({ apiKey: `sk_${i}` });
    const last = new Zernio({ apiKey: 'sk_LAST' });

    await last.accounts.listAccounts({});

    expect(authHeaders).toEqual(['Bearer sk_LAST']);
  });

  it('keeps baseURL per instance too', async () => {
    const a = new Zernio({ apiKey: 'sk_AAAA', baseURL: 'https://a.example.com/api' });
    const b = new Zernio({ apiKey: 'sk_BBBB', baseURL: 'https://b.example.com/api' });

    await a.accounts.listAccounts({});
    await b.accounts.listAccounts({});

    expect(urls[0]).toContain('a.example.com');
    expect(urls[1]).toContain('b.example.com');
  });

  it('applies each instance own defaultHeaders', async () => {
    const headerValues: (string | null)[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      headerValues.push((input as Request).headers.get('X-Tenant'));
      return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
    }) as unknown as typeof fetch;

    const a = new Zernio({ apiKey: 'sk_AAAA', defaultHeaders: { 'X-Tenant': 'a' } });
    const b = new Zernio({ apiKey: 'sk_BBBB', defaultHeaders: { 'X-Tenant': 'b' } });

    await a.accounts.listAccounts({});
    await b.accounts.listAccounts({});

    expect(headerValues).toEqual(['a', 'b']);
  });

  it('still surfaces API errors through the per-instance interceptor', async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ error: 'nope' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      })
    ) as unknown as typeof fetch;

    const zernio = new Zernio({ apiKey: 'sk_AAAA' });

    await expect(zernio.accounts.listAccounts({})).rejects.toThrow();
  });
});
