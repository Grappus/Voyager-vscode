import React, { Component } from "react";
import "./List.css";
import ListItem from './ListItem'

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
          placeholder="Search"
          style={{ width: "100%" }}
        />
        <div className="items-list">
          { (filtered_items && filtered_items.length> 0)
            ? filtered_items.map(item => (
                <ListItem item={item} />
              ))
            : <div className="no-package"> Nothing here! </div>}
        </div>
      </div>
    );
  }
}
