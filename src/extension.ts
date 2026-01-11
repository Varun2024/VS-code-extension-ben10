import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "ben10.summonAlien",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "ben10Alien",
        "Ben 10 Alien",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "media")),
            vscode.Uri.file(path.join(context.extensionPath, "src", "webview")),
          ],
        }
      );

      panel.webview.html = getWebviewContent(panel.webview, context);
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(
  webview: vscode.Webview,
  context: vscode.ExtensionContext
) {
  const styleUri = webview.asWebviewUri(
    vscode.Uri.file(
      path.join(context.extensionPath, "src", "webview", "style.css")
    )
  );

  const scriptUri = webview.asWebviewUri(
    vscode.Uri.file(
      path.join(context.extensionPath, "src", "webview", "script.js")
    )
  );

  const alienUris = {
    heatblast: webview.asWebviewUri(
      vscode.Uri.file(
        path.join(context.extensionPath, "media", "heatblast.gif")
      )
    ),
    xlr8: webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, "media", "xlr8.gif"))
    ),
    fourarms: webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, "media", "fourarms.gif"))
    ),
  };

  const alienData = JSON.stringify({
    heatblast: alienUris.heatblast.toString(),
    xlr8: alienUris.xlr8.toString(),
    fourarms: alienUris.fourarms.toString(),
  });
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy"
        content="default-src 'none';
                 img-src ${webview.cspSource};
                 style-src ${webview.cspSource};
                 script-src ${webview.cspSource};">
      <link rel="stylesheet" href="${styleUri}">
    </head>
    <body>
      <img id="alien" src="${alienUris.heatblast}" data-aliens='${alienData}' />
    </body>
    <script src="${scriptUri} "></script>
    <script>
    </html>
  `;
}

export function deactivate() {}
