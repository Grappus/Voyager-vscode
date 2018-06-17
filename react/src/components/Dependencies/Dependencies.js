import React, { Component } from "react";
import Dependency from "./Dependency";
import "./Dependencies.css";

export default class Dependencies extends Component {
  state = {
    search: ""
  };

  render() {
    let filtered_deps = this.props.dependencies.filter(dep => dep.name.includes(this.state.search) )
    // debugger
    return (
      <div className="dependencies">
        <input
          type="text"
          onChange={e => this.setState({ search: e.target.value })}
          className="search-input"
          placeholder="Search (cmd+f)"
          style={{ width: "100%" }}
        />
        <div className="dependencies-list">
          { (filtered_deps && filtered_deps.length> 0)
            ? filtered_deps.map(dep => (
                <Dependency onClick={e => this.props.onSelect(dep)} name={dep.name} version={dep.version} />
              ))
            : <div className="no-package"> Nothing here! </div>}
        </div>
      </div>
    );
  }
}
