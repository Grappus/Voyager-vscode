const cmd = require("node-cmd");
const vscode = require("vscode");
const fs = require("fs");

const rootPath = vscode.workspace.workspaceFolders[0];
const packageJsonPath = rootPath.uri.path + "/package.json";

const mvToDir = `cd ${rootPath.uri.path}`;

const status = message => vscode.window.setStatusBarMessage(message);
const output = data => {
  const outputChannel = vscode.window.createOutputChannel("Voyager");
  outputChannel.appendLine(JSON.stringify(data));
};
const alert = {
  success: msg => vscode.window.showInformationMessage(msg),
  error: msg => vscode.window.showErrorMessage(msg),
  warning: msg => vscode.window.showWarningMessage(msg)
};

const actions = {
  //{type, script}
  RUN_SCRIPT(message) {
    status("Running script: " + message.script);
    cmd.get(`${mvToDir} && ${message.script}`, (err, data, stderr) => {
      status("");
      if (err) return alert.error(err.message);
      alert.success("Script executed successfully: " + message.script);
    });
  },

  //{type, version?, name, mode}
  INSTALL_PACKAGE(message) {
    
    const command = message.version 
      ? `${mvToDir} && npm install ${message.name}@${message.version} ${message.mode}`
      :`${mvToDir} && npm install ${message.name} ${message.mode}`
    status("Running: " + command);
    cmd.get(command, (err, data, stderr) => {
      status("");
      output(data);
      if (err) return alert.error(err.message);
      alert.success("Package installed successfully: " + message.name);
    });
  },

  //{type, package, mode}
  UNINSTALL_PACKAGE(message) {
    const command = `${mvToDir} && npm uninstall ${message.package} --save --save-dev`;
    status("Running: " + command);
    cmd.get(command, (err, data, stderr) => {
      status("");
      if (err) return alert.error(err.message);
      alert.success("Package uninstalled successfully: " + message.pcakage);
    });
  },

  //{type, key, value}
  UPDATE_PACKAGE_JSON(message) {
    status("Updating package.json");
    fs.readFile(packageJsonPath, "utf-8", (err, data) => {
      if (err) return alert.error(err);
      let packageData = JSON.parse(data);
      packageData[message.key] = message.value;
      let text = JSON.stringify(packageData, null, 4);
      
      fs.writeFile(packageJsonPath, text, err => {
        if (err) return alert.error(err);
        status("");
      });
    });
  }
};

module.exports = (message, context) => {
  return actions[message.type](message, context);
};
