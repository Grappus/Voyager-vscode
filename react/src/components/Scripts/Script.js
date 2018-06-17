import React, { Component } from 'react'
import {command, window} from '../../services/bridge';

export default class ListItem extends Component {

  runCommand= () => {
    command.run(`npm run ${this.props.item}`)
    .then(res => {
      window.status(res);
    })
  }

  render() {
      const item = this.props.item;
    return (
      <div className="command--component" onClick={ this.runCommand }>
            <div className="command-left">
                <span className="caret-right">></span>
                <span className="command-name">{this.props.item && this.props.item.key}</span>
            </div>
            <span className="command-value">{this.props.item && this.props.item.value}</span>
      </div>
    )
  }
}
