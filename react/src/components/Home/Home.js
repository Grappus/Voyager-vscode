import React, { Component } from 'react'
import SearchBar from './../SearchBar/SearchBar'
import PackageDetail from './../PackageDetail/PackageDetail'
import Dependencies from './../Dependencies/Dependencies';
import './Home.css'
import cn from 'classnames';
import Tabs from '../../routes/tabs'
import packageService from "../../services/package.service"

export default class Home extends Component {
  tabs = [
    { name: 'info', label: 'Info',  },
    { name: 'dependencies', label: 'Dependencies', count: () => packageService.getDependencies().length },
    { name: 'devDependencies', label: 'Dev Dependencies', count: ()=> packageService.getDevDependencies().length },
    { name: 'scripts', label: 'Scripts' },
    // { name: 'help', label: 'Help' }
  ]

  state = {
    active_tab:   { name: 'info', label: 'Info',  },
    active_package: null,
    offsetTop: 0
  }

  selectTab = (tab_name) =>{
    let tab = this.tabs.find(tab => tab.name==tab_name);
    this.setState({
      active_tab: tab
    })
  }

  componentDidMount(){
    let offsetTop = this.mainDiv.offsetTop;
    this.setState({
      offsetTop
    })
    debugger
  }

  selectPackage = (pkg) =>{
    this.setState({
      active_package: pkg
    },()=>{
      this.pkgDetail.onFocus();
    })
  }

  render() {
    const ActiveTab = () => {
      let Tab = Tabs[this.state.active_tab.name]
      return <Tab onSelect={(dep)=> this.selectPackage(dep)} />
    };
    const data = packageService.getRawObject() ;
    return (
      <div ref={(e)=> this.mainDiv = e } className="explorer-home" style={{paddingTop: 2*this.state.offsetTop+'px'}}> 
          <div className="home--header">
            <div className="left">
                <div className="project-icon">
                  <i className={`devicon-${packageService.getIcon()}`}></i>
                </div>
                <div className="project-data">
                  <h3>{ (data && data.name) || '<No Name>' }</h3>
                  <a href={data && data.homepage}>{ (data && data.homepage) || '<No homepage mentioned>'}</a>
                </div>
            </div>
            <div className="right">
              <SearchBar 
                onSelectPackage= {(pkg) => this.selectPackage(pkg)}
                onClose={() => this.setState({active_package: null})}
              />
            </div>
          </div>

          <div className="home--body">
            <div className="sidebar">
              <ul className='key-list'>
                 {
                   this.tabs.map(tab =>(
                     <li 
                     onClick={() => this.setState({active_tab: tab})}
                     className={cn("key-list-item", {active: this.state.active_tab.name==tab.name})} > 
                      {tab.label} {tab.count? `(${tab.count()})`: null}
                     </li>
                   ))
                 }
              </ul>
            </div>
            <div className="container">
                 <ActiveTab/>
            </div>
          </div>
          <div className={cn("package--detail-popup", {active: this.state.active_package})}>
              <PackageDetail ref={e => this.pkgDetail=e} onClose={() => this.setState({active_package: null})} pkg={this.state.active_package} />
          </div>
      </div>
    )
  }
}
