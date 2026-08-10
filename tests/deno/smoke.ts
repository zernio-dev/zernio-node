/**
 * Deno smoke test for the built SDK bundle. Run with:
 *
 *   npm run build && npm run test:deno
 *
 * Deno (and other WinterCG runtimes) validate `RequestInit` strictly, so bugs
 * that leak internal SDK fields into `new Request(...)` are invisible on Node
 * but fatal here — see https://github.com/hey-api/hey-api/issues/4177 and the
 * `_stripClientSelector` workaround in src/client.ts. Every request in this
 * file goes through a stubbed `fetch`; no network I/O and no real credentials.
 *
 * This file deliberately avoids a `.test.ts` suffix so vitest's default glob
 * ignores it; `deno test` runs it by explicit path.
 */
import Zernio from '../../dist/index.mjs';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function stubFetch(onRequest?: (request: Request) => void): void {
  globalThis.fetch = ((input: Request | URL | string) => {
    onRequest?.(input as Request);
    return Promise.resolve(
      new Response(JSON.stringify({ accounts: [] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    );
  }) as typeof fetch;
}

Deno.test('SDK call constructs a valid Request under Deno', async () => {
  stubFetch();
  const client = new Zernio({ apiKey: 'sk_deno_ci' });

  // Before the _stripClientSelector fix this threw at `new Request(...)` with
  // "Argument 2 `client` must be a Deno.HttpClient", before fetch was reached.
  const result = await client.accounts.listAccounts({});

  assert(result.response?.status === 200, 'expected a 200 from the stubbed fetch');
});

Deno.test('auth header is applied through the per-instance client', async () => {
  const authHeaders: (string | null)[] = [];
  stubFetch((request) => authHeaders.push(request.headers.get('Authorization')));

  const client = new Zernio({ apiKey: 'sk_deno_ci' });
  await client.accounts.listAccounts({});

  assert(authHeaders.length === 1, 'expected exactly one request');
  assert(authHeaders[0] === 'Bearer sk_deno_ci', `unexpected auth header: ${authHeaders[0]}`);
});

Deno.test('two instances keep their own credentials', async () => {
  const authHeaders: (string | null)[] = [];
  stubFetch((request) => authHeaders.push(request.headers.get('Authorization')));

  const first = new Zernio({ apiKey: 'sk_FIRST' });
  const second = new Zernio({ apiKey: 'sk_SECOND' });
  await first.accounts.listAccounts({});
  await second.accounts.listAccounts({});
  await first.accounts.listAccounts({});

  assert(
    JSON.stringify(authHeaders) ===
      JSON.stringify(['Bearer sk_FIRST', 'Bearer sk_SECOND', 'Bearer sk_FIRST']),
    `instances leaked credentials: ${JSON.stringify(authHeaders)}`
  );
});
