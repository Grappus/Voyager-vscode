import React from 'react'
import './Package.css'
import moment from 'moment';

export default class Package extends React.Component{

  install = (mode) =>{
    window.vscode &&
    window.vscode.postMessage({
      type: "INSTALL_PACKAGE",
      name: this.props.pkg.name,
      mode
    })
  }

  render(){
    const pkg = this.props.pkg;
    return (
      pkg && 
      (<div className="package--data" onClick={this.props.onClick}>
          <div className="package--body">
              <h3 className="package--name"> {pkg.name || 'Package Name'} <small> {pkg.version || '0.0.0'} </small> </h3>
              <p className="package--description"> {pkg.description || 'The following example first defines a global custom property named "--main-bg-color", then it uses the var() function to insert the value of the custom property later in the style shee  ' }</p>
              <p className="package--update"> { 'Last updated '+moment(pkg.date).fromNow() } </p>
          </div>
          <div className="package--controls">
              <button onClick={e => this.install('--save')} className="mar-10"> save </button>
              <button onClick={e => this.install('--save-dev')} className="mar-10"> save-dev </button>
          </div>
      </div>)
    )
  }
}
