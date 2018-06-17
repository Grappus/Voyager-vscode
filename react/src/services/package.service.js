let packageFile = {};
if (!window.vscode) {
  packageFile = {
    name: "pkg-explorer",
    version: "0.1.0",
    private: true,
    dependencies: {
      classnames: "^2.2.6",
      react: "^16.4.0",
      "react-dom": "^16.4.0",
      "react-scripts": "1.1.4",
      "tiny-react-router": "^1.0.2",
      axios: "^0.18.0",
      "bootstrap-vue": "^2.0.0-rc.9",
      jquery: "^3.3.1",
      moment: "^2.22.1",
      nuxt: "^1.4.1",
      sweetalert2: "^7.20.10"
    },
    devDependencies: {
      babel: "^2.2.6",
      "babel-lklk": "^16.4.0",
      webpack: "^16.4.0"
    },
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test --env=jsdom",
      eject: "react-scripts eject"
    }
  };
} else {
  packageFile = window.packageFile;
}

export default {
  getRawObject: () => packageFile,
  getInfo: () => {
    return Object.keys(packageFile)
      .map(key => {
        if (
          typeof packageFile[key] == "string" ||
          typeof packageFile[key] == "number"
        ) {
          return { key, value: packageFile[key] };
        }
      })
      .filter(item => item);
  },
  getDependencies: () => {
    if (typeof packageFile.dependencies == "object")
      return Object.keys(packageFile.dependencies).map(key => ({
        name: key,
        version: packageFile.dependencies[key]
      }));
    return [];
  },

  getDevDependencies: () => {
    if (typeof packageFile.devDependencies == "object")
      return Object.keys(packageFile.devDependencies).map(key => ({
        name: key,
        version: packageFile.devDependencies[key]
      }));
    return [];
  },

  getScripts: () => {
    if (typeof packageFile.scripts == "object")
      return Object.keys(packageFile.scripts).map(key => ({
        key,
        value: packageFile.scripts[key]
      }));
    return [];
  },

  updatePackageFile: (key, data) => {
    if (window.fs && window.rootPath) {
      let pkgData = JSON.parse(JSON.stringify(packageFile));
      pkgData.key = data;
      window.fs.writeFile(
        window.rootPath + "/package.json",
        JSON.stringify(data, null, 4),
        function(err) {
          if (err) {
            console.log(err);
          }
          console.log("file updated");
        }
      );
    }
  }
};
