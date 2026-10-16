import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { describe, it, expect } from 'vitest';
import Zernio from '../src';

function startServer(respondAfterMs: number | null): Promise<{ baseURL: string; close: () => void }> {
  const server = createServer((_req, res) => {
    if (respondAfterMs === null) return;
    setTimeout(() => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end('{"accounts":[]}');
    }, respondAfterMs);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as AddressInfo;
      resolve({
        baseURL: `http://127.0.0.1:${port}/api`,
        close: () => {
          server.closeAllConnections();
          server.close();
        },
      });
    });
  });
}

describe('Client timeout', () => {
  it('rejects with a TimeoutError when the API does not answer within timeout', async () => {
    const server = await startServer(null);
    try {
      const client = new Zernio({ apiKey: 'test', baseURL: server.baseURL, timeout: 200 });
      const started = Date.now();
      await expect(client.accounts.listAccounts({})).rejects.toMatchObject({ name: 'TimeoutError' });
      expect(Date.now() - started).toBeLessThan(2000);
    } finally {
      server.close();
    }
  });

  it('a per-call signal replaces the client timeout', async () => {
    const server = await startServer(400);
    try {
      const client = new Zernio({ apiKey: 'test', baseURL: server.baseURL, timeout: 100 });
      const { response } = await client.accounts.listAccounts({ signal: new AbortController().signal });
      expect(response.status).toBe(200);
    } finally {
      server.close();
    }
  });

  it.each([0, Infinity])('timeout %s disables the timeout', async (timeout) => {
    const server = await startServer(300);
    try {
      const client = new Zernio({ apiKey: 'test', baseURL: server.baseURL, timeout });
      const { response } = await client.accounts.listAccounts({});
      expect(response.status).toBe(200);
    } finally {
      server.close();
    }
  });
});
