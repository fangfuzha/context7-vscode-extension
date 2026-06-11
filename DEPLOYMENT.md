# Deployment Guide for Context7 VS Code Extension

This guide explains how to build, test, and publish the Context7 VS Code extension to the Visual Studio Code Marketplace.

The extension is published as [`Upstash.context7-mcp`](https://marketplace.visualstudio.com/items?itemName=Upstash.context7-mcp) under the verified **Upstash** publisher.

## Build and Test Locally

```bash
npm install      # Install dependencies
npm run compile  # Type-check and build to out/
```

To test interactively: open this repository in VS Code, press F5 to launch an Extension Development Host, then run the **MCP: List Servers** command and confirm "Context7" appears. Ask Copilot Chat (agent mode) a library question with "use context7" to verify end to end.

To test the packaged artifact:

```bash
npx @vscode/vsce package                              # Produces context7-mcp-<version>.vsix
code --install-extension context7-mcp-<version>.vsix  # Install into your regular VS Code
```

## Publishing

### Automated (recommended)

Pushing a `v*` tag triggers `.github/workflows/publish.yml`, which builds and publishes to the Marketplace:

```bash
# 1. Bump "version" in package.json and add a CHANGELOG.md entry, commit, push
# 2. Tag and push the tag
git tag v1.1.0
git push origin v1.1.0
```

The workflow requires a repository secret named `VSCE_PAT` containing an Azure DevOps Personal Access Token with the **Marketplace (Publish)** scope, created by a member of the Upstash publisher. See [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) for how to create one. Marketplace PATs expire (max 1 year) — rotate the secret when publishing starts failing with authentication errors.

### Manual

```bash
npm install
npx @vscode/vsce publish
```

You will be prompted for the publisher Personal Access Token. `vsce` runs `vscode:prepublish` (the compile step) automatically.

To bump the version as part of publishing:

```bash
npx @vscode/vsce publish patch  # 1.1.0 → 1.1.1
npx @vscode/vsce publish minor  # 1.1.0 → 1.2.0
npx @vscode/vsce publish major  # 1.1.0 → 2.0.0
```

## Version Management

Follow semantic versioning:

- **Patch** (1.1.1): Bug fixes
- **Minor** (1.2.0): New features, backward compatible
- **Major** (2.0.0): Breaking changes

Record every release in `CHANGELOG.md`.

## Post-Publishing

- Check the extension's Marketplace page for reviews and ratings
- Monitor download statistics
- Respond to user feedback and GitHub issues

## Troubleshooting

1. **Authentication errors**: Ensure the Personal Access Token is valid, unexpired, and has the Marketplace (Publish) scope
2. **Packaging errors**: Run `npm run compile` first and check for TypeScript errors
3. **Server not appearing in VS Code**: Confirm VS Code ≥ 1.101 and check the **MCP: List Servers** command

## Resources

- [VS Code Extension Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VS Code MCP Developer Guide](https://code.visualstudio.com/api/extension-guides/ai/mcp)
- [vsce Documentation](https://github.com/microsoft/vscode-vsce)
