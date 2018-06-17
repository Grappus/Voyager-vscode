const cmd = require("node-cmd");
const vscode = require("vscode");
const fs = require("fs");

const packageJsonPath = rootPath.uri.path + "/package.json";

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
    cmd.get(message.script, (err, data, stderr) => {
      status('');
      if (err) return alert.error(err.message);
      alert.success("Script executed successfully: "+ message.script);
    });
  },

  //{type, version?, name, mode}
  INSTALL_PACKAGE(message) {
    const command = message.version?
    `npm install ${message.name} ${message.mode}`:
    `npm install ${message.name}@${message.version} ${message.mode}`;
    status("Running: "+ command);
    cmd.get(command, (err, data, stderr)=>{
        status('');
        if(err) return alert.error(err.message);
        alert.success("Package installed successfully: "+ message.pcakage)
    })
  },

  //{type, package, mode}
  UNINSTALL_PACKAGE(message) {
    const command = `npm uninstall ${message.package} --save --save-dev`
    status("Running: "+ command);
    cmd.get(command, (err, data, stderr)=>{
        status('');
        if(err) return alert.error(err.message);
        alert.success("Package uninstalled successfully: "+ message.pcakage)
    })
  },

  //{type, key, value}
  UPDATE_PACKAGE_JSON(message){
    status('Updating package.json');
    fs.readFile(packageJsonPath, "utf-8", (err, data) => {
        if (err) return alert.error(err);
        packageData = JSON.parse(data);
        packageData[message.key] = message.value;
        fs.writeFile(packageData, JSON.stringify(packageData, null, 4), (err)=>{
            if(err) return alert.error(err);
            status('');
        })
    })
  }
};

module.exports = message => {
  return actions[message.type](message);
};
