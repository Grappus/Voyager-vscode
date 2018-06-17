const vscode = require("vscode");
const getWebviewContent = require("./src/webview");
const fs = require("fs");

function activate(context) {
  const rootPath = vscode.workspace.workspaceFolders[0];
  const packageJsonPath = rootPath.uri.path + "/package.json";

  let disposable = vscode.commands.registerCommand(
    "extension.managePackage",
    function() {
      const panel = vscode.window.createWebviewPanel(
        "packages",
        "Packages",
        vscode.ViewColumn.One,
        {enableScripts: true}
      );
      // And set its HTML content
      const extensionPath = context.extensionPath;
      const manifest = extensionPath+"/react/build/asset-manifest.json";
        fs.readFile(manifest, "utf-8", (err, manifestData)=>{
          fs.readFile(packageJsonPath,"utf-8", (err, data) => {
            if (err) throw err;
            packageData = JSON.parse(data);
            let dependencies = packageData.dependencies;
            let devDependencies = packageData.devDependencies;
            panel.webview.html = getWebviewContent(context, extensionPath, manifestData, packageData);
          });
        })
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
