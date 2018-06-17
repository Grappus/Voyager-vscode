const fs = require("fs");
const vscode = require("vscode");
const path = require("path");

module.exports = function getWebviewContent(
  context,
  extensionPath,
  manifestData,
  data
) {
  manifestData = JSON.parse(manifestData);
  const cssPath = vscode.Uri.file(
    path.join(extensionPath, "react", "build", manifestData["main.css"])
  ).with({
    scheme: "vscode-resource"
  });

  const jsPath = vscode.Uri.file(
    path.join(extensionPath, "react", "build", manifestData["main.js"])
  ).with({
    scheme: "vscode-resource"
  });

  return `
  <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
            <meta name="theme-color" content="#000000"><link rel="manifest" href="/manifest.json">
            <link rel="shortcut icon" href="./favicon.ico"><title>React App</title>
            <style>
                :root {
                    --bg-color: rgb(12, 28, 49);
                    --color: #fff;
                    --font-xs: 10px;
                    --font-sm: 13px;
                    --font-md: 15px;
                    --font-lg: 20px;
                    --font-xl: 30px;
                    --font-xxl: 45px;
                }
                #root{
                  display: flex;
                  width: 100vw;
                  height: 100vh;
                  justify-content: center;
                  align-items: center;
                }
                a:focus, input:focus{
                  outline: none;
                }
            </style>   
            <link href="${cssPath}" type="text/css"  rel="stylesheet" />
        </head>
        <body>
            <div id="root">
                Loading Voyager...
            </div>
            <script>
                var packageFile = ${JSON.stringify(packageData)} ;
                var vscode = acquireVsCodeApi();
            </script>
            <script src="${jsPath}" />
        </body>
    </html>
  `;
};
