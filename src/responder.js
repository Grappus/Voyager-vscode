const cmd  = require('node-cmd');
const vscode = require('vscode');

const actions = {
    RUN_SCRIPT(message){
        console.log('test passed');
    },
    INSTALL_PACKAGE(message){

    },
    UNINSTALL_PACKAGE(message){

    }
}


module.exports = message => actions[message.type](message);
