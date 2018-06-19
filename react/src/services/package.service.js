let packageFile = {};
if (!window.vscode) {
  packageFile = {
    "name": "react-redux-starter-kit",
    "version": "3.0.1",
    "description": "Get started with React, Redux, and React-Router!",
    "main": "index.js",
    "scripts": {
      "clean": "NODE_PATH=./src && rimraf dist",
      "compile": "NODE_PATH=./src && node build/scripts/compile",
      "build": "NODE_PATH=./src && npm run clean && cross-env NODE_ENV=production npm run compile",
      "start": "NODE_PATH=./src && cross-env NODE_ENV=development node build/scripts/start",
      "test": "NODE_PATH=./src && cross-env NODE_ENV=test karma start build/karma.config",
      "test:watch": "NODE_PATH=./src && npm test -- --watch",
      "lint": "NODE_PATH=./src && eslint .",
      "lint:fix": "NODE_PATH=./src && npm run lint -- --fix"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/davezuko/react-redux-starter-kit.git"
    },
    "author": "David Zukowski <david@zuko.me> (http://zuko.me)",
    "license": "MIT",
    "dependencies": {
      "bootstrap": "^4.0.0-alpha",
      "classnames": "^2.2.5",
      "compression": "^1.6.2",
      "express": "^4.14.0",
      "fingerprintjs2": "^1.6.1",
      "firebase": "^4.10.1",
      "font-awesome": "^4.7.0",
      "history": "^4.7.2",
      "image-compressor.js": "^1.1.3",
      "loaders.css": "^0.1.2",
      "lodash": "^4.17.4",
      "moment": "^2.20.1",
      "object-assign": "^4.1.1",
      "promise": "^7.1.1",
      "prop-types": "^15.5.10",
      "react": "^16.3.2",
      "react-addons-css-transition-group": "^15.6.2",
      "react-audio-player": "^0.9.0",
      "react-autosize-textarea": "^3.0.3",
      "react-bidirectional-infinite-scroll": "^2.0.1",
      "react-datepicker": "^1.1.0",
      "react-datetime": "^2.14.0",
      "react-day-picker": "^7.0.7",
      "react-dom": "^16.3.2",
      "react-ga": "^2.5.3",
      "react-image-lightbox": "^5.0.0",
      "react-infinite-scroll-component": "^3.0.2",
      "react-loaders": "^3.0.1",
      "react-redux": "^5.0.4",
      "react-router": "^3.0.0",
      "react-router-dom": "^4.2.2",
      "react-router-redux": "^4.0.8",
      "react-router-transition": "^1.2.1",
      "react-rte": "^0.16.1",
      "react-scroll-parallax": "^1.3.3",
      "react-select": "^1.2.1",
      "react-slick": "^0.23.1",
      "react-spinners": "^0.3.2",
      "react-spring": "^4.2.1",
      "react-summernote": "^2.0.0",
      "react-switch": "^2.3.2",
      "react-transition-group": "^2.2.1",
      "redbox-react": "^1.3.6",
      "redux": "^3.6.0",
      "redux-box": "^1.6.0",
      "redux-form": "^7.2.1",
      "redux-saga": "^0.16.0",
      "redux-thunk": "^2.2.0",
      "reselect": "^3.0.1",
      "slick-carousel": "^1.8.1",
      "styled-components": "^3.2.6",
      "sweetalert": "^2.1.0",
      "sweetalert2": "^7.10.0",
      "video-react": "^0.9.4",
      "whatwg-fetch": "^2.0.3"
    },
    "devDependencies": {
      "babel-core": "^6.24.1",
      "babel-eslint": "^7.2.3",
      "babel-loader": "^7.0.0",
      "babel-plugin-syntax-dynamic-import": "^6.18.0",
      "babel-plugin-transform-class-properties": "^6.24.1",
      "babel-plugin-transform-decorators-legacy": "^1.3.4",
      "babel-plugin-transform-object-rest-spread": "^6.23.0",
      "babel-plugin-transform-runtime": "^6.15.0",
      "babel-polyfill": "^6.26.0",
      "babel-preset-env": "^1.4.0",
      "babel-preset-react": "^6.24.1",
      "babel-runtime": "^6.20.0",
      "chai": "^3.5.0",
      "chai-as-promised": "^6.0.0",
      "chai-enzyme": "^0.6.1",
      "chalk": "^1.1.3",
      "codecov": "^2.2.0",
      "connect-history-api-fallback": "^1.3.0",
      "cross-env": "^5.0.0",
      "css-loader": "^0.28.9",
      "dirty-chai": "^1.2.2",
      "enzyme": "^2.8.2",
      "eslint": "^3.19.0",
      "eslint-config-standard": "^10.2.1",
      "eslint-config-standard-react": "^5.0.0",
      "eslint-plugin-babel": "^4.1.1",
      "eslint-plugin-import": "^2.2.0",
      "eslint-plugin-node": "^4.2.2",
      "eslint-plugin-promise": "^3.5.0",
      "eslint-plugin-react": "^7.0.1",
      "eslint-plugin-standard": "^3.0.1",
      "extract-text-webpack-plugin": "^2.1.0",
      "figures": "^2.0.0",
      "file-loader": "^0.11.1",
      "fs-extra": "^3.0.1",
      "html-webpack-plugin": "^2.24.1",
      "karma": "^1.7.0",
      "karma-coverage": "^1.1.1",
      "karma-mocha": "^1.3.0",
      "karma-mocha-reporter": "^2.2.1",
      "karma-phantomjs-launcher": "^1.0.4",
      "karma-webpack-with-fast-source-maps": "^1.10.0",
      "mocha": "^3.2.0",
      "node-sass": "^4.5.3",
      "phantomjs-prebuilt": "^2.1.14",
      "react-addons-test-utils": "^15.5.1",
      "react-test-renderer": "^15.5.4",
      "rimraf": "^2.6.1",
      "sass-loader": "^6.0.5",
      "sinon": "^2.2.0",
      "sinon-chai": "^2.10.0",
      "style-loader": "^0.17.0",
      "url-loader": "^0.5.8",
      "webpack": "^2.5.1",
      "webpack-dev-middleware": "^1.8.4",
      "webpack-hot-middleware": "^2.13.2",
      "yargs": "^8.0.1"
    }
  }
  ;
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

  getIcon(){
    let icons = {
      react: "react-original",
      vue: "vuejs-plain",
      angular: "angularjs-plain",
      meteor: "meteor-plain",
      backbone: "backbonejs-plain",
      express: "express-original",
      node: "nodejs-plain",
    }
    let icon = "javascript-plain";
    Object.keys(icons).every(framework=>{
       if (Object.keys(packageFile.dependencies).includes(framework)){
         debugger
          icon = icons[framework]
          return false;
       }
    })
    return icon;
  }

};
