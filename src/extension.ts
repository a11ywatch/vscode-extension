import * as vscode from "vscode";
import { ViewLoader } from "./view/ViewLoader";
import { CommonMessage } from "./view/messages/messageTypes";
import { initApplication } from "@a11ywatch/a11ywatch";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("webview.open", async () => {
      // launch a11ywatch
      await initApplication();
      ViewLoader.showWebview(context);
    }),

    vscode.commands.registerCommand("extension.sendMessage", () => {
      vscode.window
        .showInputBox({
          prompt: "Send message to Webview",
        })
        .then((result) => {
          result &&
            ViewLoader.postMessageToWebview<CommonMessage>({
              type: "COMMON",
              payload: result,
            });
        });
    })
  );
}

export function deactivate() {}
