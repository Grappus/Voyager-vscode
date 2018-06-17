import React, { Component } from 'react'

export default class ListItem extends Component {

 runCommand = (script) => {
    window.vscode ? window.vscode.postMessage({
      type: 'RUN_SCRIPT',
      script: `npm run ${this.props.item.key}`
    }):
    alert('npm run '+ this.props.item.key)
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
