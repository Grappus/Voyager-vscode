import React, { Component } from 'react'
import './SearchBar.css'
import Package from './Package'
import npmService from '../../services/npms.service'
import {debounce} from 'lodash'
const enhanceWithClickOutside = require('react-click-outside');

class SearchBar extends Component {

  constructor(){
    super();
    this.setSuggestions = debounce(this.setSuggestions, 250);
  }

  state = {
    suggestions: [],
    search: ''
  }

  handleClickOutside() {
    this.setState({
      suggestions: [],
      search: ''
    })
  }

  setSuggestions = (val) => {
      npmService.getSuggestions(val)
        .then( res => {
          this.setState({
            suggestions: res.data
          })
      })
  }

  setSearch = (e) => {
    if(e.target.value===""){
      return this.setState({
        suggestions: [],
        search: ""
      })
    }

    this.setState({
      search: e.target.value
    })

    this.setSuggestions(e.target.value);
   
  }


  render() {
    return (
      <div className="search--bar">
            <div className="search--top">
                <div className="search--platform">npm</div>
                <input   value={this.state.search} 
                // onKeyDown = {(e) => this.setSuggestions(e)}
                onChange={(e) => this.setSearch(e)} type="text" className="search-input" placeholder="Search Packages"/>
            </div>
            <div className="search--bottom">
                <div className="search--pacakge">
                  {
                    this.state.suggestions.map(sug => <Package onClick={()=> this.props.onSelectPackage(sug.package) } pkg={sug.package} />)
                  }
                </div>
            </div>
      </div>
    )
  }
}


export default enhanceWithClickOutside(SearchBar)
