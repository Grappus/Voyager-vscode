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
      const cssPath = extensionPath+"/view/static/css/main.css";
      const jsPath = extensionPath+"/view/static/js/main.js";
      fs.readFile(cssPath,"utf-8", (err, cssData)=>{
         if(err) throw(err);
         fs.readFile(jsPath,"utf-8", (err, jsData)=>{
            if(err) throw(err);
            fs.readFile(packageJsonPath,"utf-8", (err, data) => {
                if (err) throw err;
                packageData = JSON.parse(data);
                let dependencies = packageData.dependencies;
                let devDependencies = packageData.devDependencies;
        
                panel.webview.html = getWebviewContent(context, cssData, jsData, data);
              });
         })
      })
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
