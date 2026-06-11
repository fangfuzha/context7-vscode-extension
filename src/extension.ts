import * as vscode from 'vscode';

const SERVER_URL = 'https://mcp.context7.com/mcp';

export function activate(context: vscode.ExtensionContext) {
	const didChangeServerDefinitions = new vscode.EventEmitter<void>();
	context.subscriptions.push(didChangeServerDefinitions);

	// Re-provide the server definition when the API key changes so the new
	// header takes effect without reloading the window.
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration((event) => {
			if (event.affectsConfiguration('context7.apiKey')) {
				didChangeServerDefinitions.fire();
			}
		})
	);

	// Register Context7 MCP Server
	context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('upstash/context7', {
		onDidChangeMcpServerDefinitions: didChangeServerDefinitions.event,
		provideMcpServerDefinitions(): vscode.McpServerDefinition[] {
			const apiKey = vscode.workspace.getConfiguration('context7').get<string>('apiKey');
			const headers: Record<string, string> = apiKey ? { CONTEXT7_API_KEY: apiKey } : {};
			return [
				new vscode.McpHttpServerDefinition(
					'Context7',
					vscode.Uri.parse(SERVER_URL),
					headers
				)
			];
		}
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }
