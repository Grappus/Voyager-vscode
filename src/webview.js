const fs = require("fs")

module.exports = function getWebviewContent(context, cssData, jsData, packageData) {
  return `
  <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
            <meta name="theme-color" content="#000000"><link rel="manifest" href="/manifest.json">
            <link rel="shortcut icon" href="./favicon.ico"><title>React App</title>
            <style>
                ${cssData}
            </style>
        </head>
        <body>
            <div id="root"></div>
            <script>
                var packageData = ${packageData} ;
                console.log('package',packageData);
                ${jsData}
            </script>
        </body>
    </html>
  `;
};
