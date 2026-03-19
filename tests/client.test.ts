import { describe, it, expect } from 'vitest';
import Zernio, { Late, ZernioApiError, LateApiError } from '../src';

describe('Zernio Client', () => {
  it('should throw error when no API key is provided', () => {
    const originalZernio = process.env['ZERNIO_API_KEY'];
    const originalLate = process.env['LATE_API_KEY'];
    delete process.env['ZERNIO_API_KEY'];
    delete process.env['LATE_API_KEY'];

    expect(() => new Zernio()).toThrow(ZernioApiError);
    expect(() => new Zernio()).toThrow('ZERNIO_API_KEY');

    process.env['ZERNIO_API_KEY'] = originalZernio;
    process.env['LATE_API_KEY'] = originalLate;
  });

  it('should read ZERNIO_API_KEY env var', () => {
    const original = process.env['ZERNIO_API_KEY'];
    process.env['ZERNIO_API_KEY'] = 'zernio_test_key';

    const client = new Zernio();
    expect(client.apiKey).toBe('zernio_test_key');

    if (original) process.env['ZERNIO_API_KEY'] = original;
    else delete process.env['ZERNIO_API_KEY'];
  });

  it('should fall back to LATE_API_KEY env var for backwards compatibility', () => {
    const originalZernio = process.env['ZERNIO_API_KEY'];
    const originalLate = process.env['LATE_API_KEY'];
    delete process.env['ZERNIO_API_KEY'];
    process.env['LATE_API_KEY'] = 'late_test_key';

    const client = new Zernio();
    expect(client.apiKey).toBe('late_test_key');

    process.env['ZERNIO_API_KEY'] = originalZernio;
    process.env['LATE_API_KEY'] = originalLate;
  });

  it('should prefer ZERNIO_API_KEY over LATE_API_KEY', () => {
    const originalZernio = process.env['ZERNIO_API_KEY'];
    const originalLate = process.env['LATE_API_KEY'];
    process.env['ZERNIO_API_KEY'] = 'zernio_wins';
    process.env['LATE_API_KEY'] = 'late_loses';

    const client = new Zernio();
    expect(client.apiKey).toBe('zernio_wins');

    if (originalZernio) process.env['ZERNIO_API_KEY'] = originalZernio;
    else delete process.env['ZERNIO_API_KEY'];
    if (originalLate) process.env['LATE_API_KEY'] = originalLate;
    else delete process.env['LATE_API_KEY'];
  });

  it('should create client with provided API key', () => {
    const client = new Zernio({ apiKey: 'test_key' });
    expect(client.apiKey).toBe('test_key');
  });

  it('should use default base URL', () => {
    const client = new Zernio({ apiKey: 'test_key' });
    expect(client.baseURL).toBe('https://zernio.com/api');
  });

  it('should allow custom base URL', () => {
    const client = new Zernio({
      apiKey: 'test_key',
      baseURL: 'https://custom.example.com/api',
    });
    expect(client.baseURL).toBe('https://custom.example.com/api');
  });

  it('should have all resource namespaces', () => {
    const client = new Zernio({ apiKey: 'test_key' });

    expect(client.posts).toBeDefined();
    expect(client.accounts).toBeDefined();
    expect(client.profiles).toBeDefined();
    expect(client.analytics).toBeDefined();
    expect(client.accountGroups).toBeDefined();
    expect(client.queue).toBeDefined();
    expect(client.webhooks).toBeDefined();
    expect(client.apiKeys).toBeDefined();
    expect(client.media).toBeDefined();
    expect(client.tools).toBeDefined();
    expect(client.users).toBeDefined();
    expect(client.usage).toBeDefined();
    expect(client.logs).toBeDefined();
    expect(client.connect).toBeDefined();
    expect(client.reddit).toBeDefined();
    expect(client.invites).toBeDefined();
  });

  it('should have posts methods', () => {
    const client = new Zernio({ apiKey: 'test_key' });

    expect(client.posts.listPosts).toBeTypeOf('function');
    expect(client.posts.createPost).toBeTypeOf('function');
    expect(client.posts.getPost).toBeTypeOf('function');
    expect(client.posts.updatePost).toBeTypeOf('function');
    expect(client.posts.deletePost).toBeTypeOf('function');
    expect(client.posts.retryPost).toBeTypeOf('function');
    expect(client.posts.bulkUploadPosts).toBeTypeOf('function');
  });
});

describe('Backwards compatibility aliases', () => {
  it('should export Late as alias for Zernio', () => {
    expect(Late).toBe(Zernio);
  });

  it('should export LateApiError as alias for ZernioApiError', () => {
    expect(LateApiError).toBe(ZernioApiError);
  });

  it('should work with Late class name', () => {
    const client = new Late({ apiKey: 'test_key' });
    expect(client.apiKey).toBe('test_key');
    expect(client.posts).toBeDefined();
  });
});

describe('Error classes', () => {
  it('should export ZernioApiError', () => {
    expect(ZernioApiError).toBeDefined();
  });

  it('should create ZernioApiError with correct properties', () => {
    const error = new ZernioApiError('Test error', 400, 'test_code');
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('test_code');
    expect(error.name).toBe('ZernioApiError');
  });
});
