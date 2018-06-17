const vscode = require("vscode");
const initWebview = require("./src/init");

function activate(context) {
   initWebview(context);
}

exports.activate = activate;
function deactivate() {}
exports.deactivate = deactivate;
