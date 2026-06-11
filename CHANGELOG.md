# Changelog

## [1.1.0] - 2026-06-11

### Changed

- The extension now connects to the hosted Context7 MCP server (`https://mcp.context7.com/mcp`) over Streamable HTTP instead of bundling and spawning a local copy of `@upstash/context7-mcp`. The server is always up to date and no local Node.js process is spawned.
- Server definition ID updated to `upstash/context7` to match the entry in the official MCP registry, so VS Code can deduplicate the two ([#3](https://github.com/upstash/context7-vscode-extension/pull/3), thanks @sandy081).
- Switched from the proposed-API `vscode.d.ts` snapshot to the stable `@types/vscode` typings (the MCP server definition provider API is stable since VS Code 1.101).

### Added

- `context7.apiKey` setting: optionally provide a Context7 API key (from [context7.com/dashboard](https://context7.com/dashboard)) for higher rate limits and access to private repositories. Changes take effect without reloading the window.
- MIT license text (the LICENSE file was previously empty).
- CI workflows for build verification and Marketplace publishing.

## [1.0.1] - 2025-08-04

- Initial Marketplace release: registers the Context7 MCP server (stdio, bundled `@upstash/context7-mcp`) with VS Code's built-in MCP support.
