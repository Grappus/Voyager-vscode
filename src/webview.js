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
    path.join(
      extensionPath,
      "react",
      "build",
      manifestData["main.css"]
    )
  ).with({
    scheme: "vscode-resource"
  });

  const jsPath = vscode.Uri.file(
    path.join(
      extensionPath,
      "react",
      "build",
      manifestData["main.js"]
    )
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
            <link href="${cssPath}" type="text/css"  rel="stylesheet" />
        </head>
        <body>
            <div id="root"></div>
            <script>
                var packageData = ${packageData} ;
            </script>
            <script src="${jsPath}" />
        </body>
    </html>
  `;
};
