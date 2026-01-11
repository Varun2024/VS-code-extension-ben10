import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "ben10.summonAlien",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "ben10Alien",
        "Ben 10 Alien",
        vscode.ViewColumn.Two,
        {
          enableScripts: true
        }
      );

      const htmlPath = path.join(
        context.extensionPath,
        "src",
        "webview",
        "index.html"
      );

      panel.webview.html = fs.readFileSync(htmlPath, "utf8");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
