import React, { Component } from 'react'
import SearchBar from './../SearchBar/SearchBar'
import PackageDetail from './../PackageDetail/PackageDetail'
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
    active_package: null
  }

  selectTab = (tab_name) =>{
    let tab = this.tabs.find(tab => tab.name===tab_name);
    this.setState({
      active_tab: tab
    })
  }

  selectPackage = (pkg) =>{
    this.setState({
      active_package: pkg
    },()=>{
      this.pkgDetail.onFocus();
    })
  }

  render() {
    const ActiveTab = () => Tabs[this.state.active_tab.name];
    return (
      <div className="explorer-home">
          <div className="home--header">
            <div className="left">
                <div className="project-icon"></div>
                <div className="project-data">
                  <h3>Hello World</h3>
                  <p>https://github.com/anish000kumar/hello-world.git</p>
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
                     className={cn("key-list-item", {active: this.state.active_tab.name===tab.name})} > 
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
