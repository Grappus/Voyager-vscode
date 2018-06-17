import React, { Component } from 'react'

export default class ListItem extends Component {
  state={
    value: ''
  }
  componentWillMount(){
    this.setState({
      value : String(this.props.item.value)
    })
  }

  update=(e)=>{
    this.setState({
      value: e.target.value
    })
    window.vscode && window.vscode.postMessage({
      type: 'UPDATE_PACKAGE_JSON',
      key: this.props.item.key,
      value: this.props.item.value
    })
  }

  render() {
      const item = this.props.item;
    return (
      <div className="listitem--component">
            <input type="text" className="list-input" disabled placeholder={item && item.key}/>
            <input type="text" className="list-input" onChange={e => this.update(e)} value={this.state.value}/>
      </div>
    )
  }
}
