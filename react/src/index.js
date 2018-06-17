import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Home from "./components/Home/Home";

ReactDOM.render(<Home />, document.getElementById("root"));
registerServiceWorker();
