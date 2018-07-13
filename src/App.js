import React, {
  Component
} from 'react';
import {
  locations
} from './Locations.js';
import {
  mapStyle
} from './mapStyle.js';
import Map from './Map'
import './App.css';
import List from './List.js';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class App extends Component {
  state = {
    query: '',
    clickedlistItem: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }


  clickedItem = (itemList) => {
    this.setState({
      clickedlistItem: itemList.trim()
    })
  }

  render() {
    const {
      query
    } = this.state
    let showLocations
    if (query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showLocations = locations.filter((l) => match.test(l.title))
    } else {
      showLocations = locations;
    }
    showLocations.sort(sortBy('title'));

    return (

      <
      div >
      <
      nav className = "nav" >
      <
      span id = "subject"
      tabIndex = "0" > Coffee & roastery shops in jeddah < /span> <
      /nav>

      <
      div className = "map-container"
      role = "application"
      tabIndex = "-1" >

      <
      Map clickedlistItem = {
        this.state.clickedlistItem
      }
      locations = {
        showLocations
      }
      /> <
      /div> <
      List updateQuery = {
        this.updateQuery
      }
      clickedItem = {
        this.clickedItem
      }
      locations = {
        showLocations
      }
      />

      <
      /div>
    );
  }
}

export default App;
