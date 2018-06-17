const vscode = require("vscode");
const getWebviewContent = require("./src/webview");
const commands = require("./src/commands");
const fs = require("fs");
const panel = null;

onDidReceiveMessage = commands;

function activate(context) {
  const rootPath = vscode.workspace.workspaceFolders[0];
  const packageJsonPath = rootPath.uri.path + "/package.json";
  let disposable = vscode.commands.registerCommand(
    "extension.managePackage",
    () => {
     const panel = vscode.window.createWebviewPanel(
        "Voyager",
        "Voyager",
        vscode.ViewColumn.One,
        { enableScripts: true, retainContextWhenHidden: true }
      );
      // And set its HTML content
      panel.webview.onDidReceiveMessage(onDidReceiveMessage, null, disposable);
      const extensionPath = context.extensionPath;
      const manifest = extensionPath + "/react/build/asset-manifest.json";
      fs.readFile(manifest, "utf-8", (err, manifestData) => {
        fs.readFile(packageJsonPath, "utf-8", (err, data) => {
          if (err) throw err;
          packageData = JSON.parse(data);
          let dependencies = packageData.dependencies;
          let devDependencies = packageData.devDependencies;
          panel.webview.html = getWebviewContent(
            context,
            extensionPath,
            manifestData,
            packageData
          );
        });
      });
    }
  );
  // panel &&
  //   

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
