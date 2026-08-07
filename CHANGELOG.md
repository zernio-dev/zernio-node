# Changelog

All notable changes to the Late Node.js SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.519] - 2026-08-07

### Fixed
- **Security: API keys leaked between client instances.** The auth interceptor was registered on a module-global HTTP client, so every `new Zernio({ apiKey })` stacked another interceptor on the same shared client and the last-constructed key won for **all** in-flight requests. In a process serving more than one tenant (a server handling concurrent requests, a worker looping over accounts), one tenant's call could go out carrying another tenant's token and return their data. Each instance now owns its client, and `baseURL` and `defaultHeaders` are per-instance for the same reason. Upgrade if you construct more than one `Zernio` in a process.

Releases between 0.1.0 and 0.2.518 were automated regenerations from the OpenAPI spec and are not itemised here.

## [0.1.0] - 2025-01-16

### Added
- Initial public release
- Full coverage of Late API endpoints
- TypeScript support with full type definitions
- Support for all 13 social media platforms: Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Facebook, Pinterest, Threads, Bluesky, Reddit, Snapchat, Telegram, and Google Business Profile
- Error handling with specialized error classes (`LateApiError`, `RateLimitError`, `ValidationError`)
- Rate limit information in error responses
- ESLint configuration for code quality
- Comprehensive test suite

### API Coverage
- Posts: create, list, get, update, delete, retry, bulk upload
- Accounts: list, health check, follower stats, Google Business reviews, LinkedIn mentions
- Profiles: create, list, get, update, delete
- Analytics: post metrics, LinkedIn analytics, YouTube daily views
- Account Groups: create, list, update, delete
- Queue: slots management, preview
- Webhooks: settings management, logs, testing
- API Keys: create, list, delete
- Media: presigned URL generation
- Tools: downloads, hashtag checking, transcripts
- Users: list, get
- Usage: stats
- Logs: list, get
- Connect: OAuth flows for all platforms
- Reddit: feed, search
- Invites: platform invites management
