const responder = require("./responder.js");
const getWebviewContent = require("../src/webview");
const vscode = require("vscode");
const fs = require("fs");

const rootPath = vscode.workspace.workspaceFolders[0];
const packageJsonPath = rootPath.uri.path + "/package.json";

module.exports = (context) => {
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
      panel.webview.onDidReceiveMessage(responder, null, disposable);
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

  context.subscriptions.push(disposable);
};
