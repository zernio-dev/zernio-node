import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from 'vitest';
import Zernio, { ValidationError } from '../src';

describe('dot-segment path parameters', () => {
  const originalFetch = globalThis.fetch;
  let fetchMock: Mock<[Request], Promise<Response>>;
  let client: Zernio;

  beforeEach(() => {
    fetchMock = vi.fn(
      async (_request: Request) =>
        new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    client = new Zernio({ apiKey: 'sk_test' });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('rejects ".." and names the first offending param', async () => {
    const error = await client.comments
      .unhideInboxComment({ path: { postId: '..', commentId: '..' }, query: { accountId: 'acc_1' } })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ValidationError);
    expect((error as ValidationError).param).toBe('postId');
    expect((error as ValidationError).fields).toEqual({ postId: ['must not be empty, "." or ".."'] });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects "." and the empty string', async () => {
    await expect(client.posts.deletePost({ path: { postId: '.' } })).rejects.toBeInstanceOf(
      ValidationError
    );
    await expect(client.posts.deletePost({ path: { postId: '' } })).rejects.toBeInstanceOf(
      ValidationError
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects ".." on an account path', async () => {
    await expect(
      client.accounts.deleteAccount({ path: { accountId: '..' } })
    ).rejects.toBeInstanceOf(ValidationError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an array that joins to a dot segment', async () => {
    await expect(
      client.posts.deletePost({ path: { postId: ['..'] as unknown as string } })
    ).rejects.toBeInstanceOf(ValidationError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('keeps percent-encoded dots escaped once more so they stay a literal segment', async () => {
    await client.posts.deletePost({ path: { postId: '%2e%2e' } });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0].url).toContain('%252e%252e');
  });

  it('dispatches an ordinary id exactly once', async () => {
    await client.posts.deletePost({ path: { postId: 'abc' } });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
