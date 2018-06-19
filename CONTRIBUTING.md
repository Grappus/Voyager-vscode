# Brief
The project uses a react app under the hood. The react app emits "message" to access the vscode specific APIs and perform the tasks.
(More detail on vscode extension API can be found at https://code.visualstudio.com/docs/extensionAPI/overview)

# Installing and setup
Simply fork & clone the repo, and then run ```npm install``` in the root directory. Running `npm run dev` should open the react app in browser.
Also running ```npm run build``` should integrate the react app with vscode plugin. So after running `npm run build`, once you debug the vscode plugin, your latest changes in the react app should be reflected.

# About API
for api npms.io(https://github.com/npms-io) is being used under the hood. You can refer to their API docs for more details.
(https://api-docs.npms.io/)
