
const Prompt = (text) => {
    return new Promise((resolve, reject)=>{
        resolve(prompt(text))
    })
}

export default {
    status: (text, timeout) => {
        // return window.vscode?
        // window.vscode.window.setStatusBarMessage(text, timeout):
        // alert(text);
    },

    alert: (text, type, options={}) => {
        switch(type){
            case 'success':
                return window.vscode?
                window.vscode.window.showInformationMessage(text, options):
                alert(text);
            case 'info':
                return window.vscode?
                window.vscode.window.showInformationMessage(text, options):
                alert(text);
            case 'error':
                return window.vscode?
                window.vscode.window.showErrorMessage(text, options):
                alert(text);
            case 'warning':
                return window.vscode?
                window.vscode.window.showWarningMessage(text, options):
                alert(text);
            default:
                return window.vscode?
                window.vscode.window.showInformationMessage(text, options):
                alert(text);

        }
    },

    progress:(options, task, token) => {
        return window.vscode?
        window.vscode.window.withProgress(options, task, token):
        alert('showing progress')
    },

    prompt: (options={placeholder: 'Enter your response'}, token) =>{
        return window.vscode?
        window.vscode.window.showInputBox(options, token):
        Prompt('Enter your response')
    },

    picker: (items, options) => {
        return window.vscode?
        window.vscode.window.showQuickPick(items, options):
        alert('picker to be shown with')
    },

    open: (document, column, preserveFocus) => {
        return window.vscode?
        window.vscode.window.showTextDocument(document, column, preserveFocus):
        alert('Opened file')
    }
}