import * as vscode from 'vscode';
import { join } from 'path';
import { Message, CommonMessage } from './messages/messageTypes';

export class ViewLoader {
  public static currentPanel?: vscode.WebviewPanel;
  private panel: vscode.WebviewPanel;
  private context: vscode.ExtensionContext;
  private disposables: vscode.Disposable[];

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.disposables = [];

    this.panel = vscode.window.createWebviewPanel('reactApp', 'A11yWatch App', vscode.ViewColumn.One, {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [vscode.Uri.file(join(this.context.extensionPath, 'out', 'app'))],
    });

    // render webview
    this.renderWebview();

    // listen messages from webview
    this.panel.webview.onDidReceiveMessage(
      (message: Message) => {
        if (message.type === 'RELOAD') {
          vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
        } else if (message.type === 'COMMON') {
          const text = (message as CommonMessage).payload;
          vscode.window.showInformationMessage(`Received message from Webview: ${text}`);
        }
      },
      null,
      this.disposables
    );

    this.panel.onDidDispose(
      () => {
        this.dispose();
      },
      null,
      this.disposables
    );
  }

  private renderWebview() {
    this.panel.webview.html = this.render();
  }

  static showWebview(context: vscode.ExtensionContext) {
    const cls = this;
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    if (cls.currentPanel) {
      cls.currentPanel.reveal(column);
    } else {
      cls.currentPanel = new cls(context).panel;
    }
  }

  static postMessageToWebview<T extends Message = Message>(message: T) {
    this.currentPanel?.webview.postMessage(message);
  }

  public dispose() {
    ViewLoader.currentPanel = undefined;

    // Clean up our resources
    this.panel.dispose();

    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  render() {
    const bundleScriptPath = this.panel.webview.asWebviewUri(
      vscode.Uri.file(join(this.context.extensionPath, 'out', 'app', 'bundle.js'))
    );

    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>A11yWatch App</title>
        </head>
        <body>
          <div id="root"></div>
          <script>
            acquireVsCodeApi();
          </script>
          <script src="${bundleScriptPath}"></script>
        </body>
      </html>
    `;
  }
}
