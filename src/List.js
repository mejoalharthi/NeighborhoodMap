import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
//import { locations } from './Locations.js';
import HamburgerMenu from './HamburgerMenu.js';


import './App.css';

class List extends Component {

  state = {
        open:false
     }


     handleClick=()=> {
         const list = document.getElementById('list');
         const input = document.getElementById('input');
          const ul = document.getElementById('ul');
        if(!this.state.open ){
           list.className ="list visible";
           input.className="input visible";
          ul.className="listItems visible"

       }else{
        list.classList.remove("listView");
        input.classList.remove("input");
        list.className ="list hidden";
        input.className="input hidden";
       ul.className="listItems hidden"

      }
         this.setState({
             open: !this.state.open
         });

    }


    KeyPressed(event) {
       if(event.charCode === 13){
        this.props.clickedItem(event.target.textContent)
      }
    }


  render(){

     return(
       <div >

       <HamburgerMenu
       isOpen={this.state.open}
       menuClicked={this.handleClick.bind(this)}
       strokeWidth={1}
       rotate={0}
       borderRadius={0}
       animationDuration={0.5} />

       <div id="list" className="hidden">
       <input type="text" placeholder="search" tabIndex="0" id="input" role="Search"
        aria-label="Type for Search Locations"
        autoComplete="off"
        className="hidden"
        value={this.props.query}
        onChange={(event) => this.props.updateQuery(event.target.value)} />

       <ul id="ul" className="listItems hidden" tabIndex="0"  aria-label="Locations List Items">
       { this.props.locations.map( (l, index) => (
         <li
         tabIndex="0"
         aria-label = {"View More Details for "+ l.title}
         key={index}
         onClick={(event)=>this.props.clickedItem(event.target.textContent)}
         onKeyPress={(event)=> this.KeyPressed(event)}
          > {l.title}</li>

       ))}


       </ul>
       </div>



</div>

);

}
}export default List;
