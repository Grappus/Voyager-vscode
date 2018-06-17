import React, { Component } from 'react'
import npmService from './../../services/npms.service'
import cn from 'classnames'

export default class Dependency extends Component {

  state= {
    editVersion:  false,
    pkg: null
  }



  UNSAFE_componentWillMount = () => {
    npmService.getPackageDetail(this.props.name)
    .then(res => {
        this.setState({
            pkg: res.data
        })
    })
  }


 parseVersion= (version) => {
  if(version[0]==="^"){
    return <span>{version.substring(1, version.length)} <span style={{opacity:0.5}}> + </span> </span>
  }
  return <span> {version} </span>
 }

 toggleVersionInput = () =>{
   this.setState({
     editVersion: !this.state.editVersion
   })
 }
 onKeyDown = (e) =>{
   if(e.key==='Enter'){
     this.toggleVersionInput()
   }
 }

 getColor = (version) => {
   if(this.state.pkg){ 
     let refVersion = this.state.pkg.collected.metadata.version;
      if(version[0] === "^")
      version = version.substring(1, version.length)
      else if(refVersion[0] === '^')
          refVersion = refVersion.substring(1, refVersion.length)
      
      version = version.split('.');
      refVersion = refVersion.split('.');
      if( Number(refVersion[0] === Number(version[0])) ){
         if( Number(refVersion[1]) === Number(version[1]) )
            return 'green'
         else
            return '#7d7d24'
      }
      else
        return 'red'
   }
   return 'rgba(0,0,0,0.5)';
 }
 

  render() {
    return (
      <div className="dependency">
        <span className="dependency--name"> {this.props.name|| 'react'} </span>
        <div className="dependency--version">
          { this.state.editVersion ?
             <input onKeyDown={this.onKeyDown} type="text" className="version" defaultValue={this.props.version || '16.3.0'} ></input>:
             <span className="version-span" onClick={this.toggleVersionInput}> {(this.props.version && this.parseVersion(this.props.version)) || '16.3.0'} </span>
          }
          { <span className={cn("latest-version", {active:this.state.pkg})} style={{backgroundColor: this.getColor( this.props.version)}} > 
                {(this.state.pkg && this.state.pkg.collected && this.state.pkg.collected.metadata.version) || '16.3.1'} 
            </span>
          }
        </div>
        <span className="dependency--close">X</span>
      </div>
    )
  }
}
