import React, { Component } from 'react'

export default class ListItem extends Component {
  render() {
      const item = this.props.item;
    return (
      <div className="listitem--component">
            <input type="text" className="list-input" placeholder={item && item.key}/>
            <input type="text" className="list-input" placeholder={item && String(item.value)}/>
      </div>
    )
  }
}
