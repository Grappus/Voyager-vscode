import React, { Component } from "react";
import "./Scripts.css";
import Script from './Script'

export default class items extends Component {
  state = {
    search: ""
  };

  render() {
    let filtered_items = this.props.items.filter(item => item.key.includes(this.state.search.trim()) )
    // debugger
    return (
      <div className="list--component">
        <input
          type="text"
          onChange={e => this.setState({ search: e.target.value })}
          className="search-input"
          placeholder="Search (cmd+f)"
          style={{ width: "100%" }}
        />
        <div className="items-list">
          { (filtered_items && filtered_items.length> 0)
            ? filtered_items.map(item => (
                <Script item={item} />
              ))
            : <div className="no-package"> Nothing here! </div>}
        </div>
      </div>
    );
  }
}
