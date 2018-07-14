import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import { mapStyle } from './mapStyle.js';
import List from './List.js';
import './App.css';

class Map extends Component {
state = {
      map: {},
      isMapLoaded:true,
      markers: [],
      InfoWindows:[]
   }

componentWillReceiveProps = ({ isScriptLoaded, isScriptLoadSucceed }) => {
if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
  //Check if map is loaded
     if (isScriptLoadSucceed) {
       //if it is loaded
         console.log("Map Is Successfully Loaded");
           const map = new window.google.maps.Map(document.getElementById('map'), {
             center: {lat: 21.485811, lng: 39.1925048},
             zoom: 10,
            // mapTypeControl: false,
             styles: mapStyle
           });
       this.setState({map:map});
     }
     else {
       //if it is not loaded
       console.log("erorr in loading map");
       this.setState({isMapLoaded:false});
     }
   }
 }//End

 componentDidMount =() => {
  const locations = this.props.locations;
  for (let  i = 0; i < locations.length; i++){
    var Id = "NZKEFBQSOU2NFK0TH3MWKAWXY0BREEK2G2OMGEGRNDZW3ZWW";
    var Secret = "HNF2DW5RC5TX4MV1E12OPYRUYJ3JFSZVZCD4LVYB4TNLW02H";
    var request = "https://api.foursquare.com/v2/venues/search?client_id=" + Id + "&client_secret=" + Secret +
    "&v=20180323&ll=" + locations[i].location.lat+','+locations[i].location.lng + "&limit=1";

    fetch(request).then(function (response) {
      if (response.status !== 200) {
          return;
      }
      response.json().then(function (data){
            locations[i].data = data.response.venues[0];

      });
    }).catch(error =>
      console.error(error)
      )
  }
}

 componentDidUpdate(){
   let self=this;
   if(this.state.isMapLoaded){
     for(let marker of this.state.markers){
       marker.setMap(null);
     }
     while(this.state.markers.length > 0) {
      this.state.markers.pop();
     }
   const locations= this.props.locations;
   var largeInfowindow = new window.google.maps.InfoWindow();
   let bounds = new window.google.maps.LatLngBounds();
   // The following group uses the location array to create an array of markers on initialize.
   for (let i = 0; i < locations.length; i++) {
     // Get the position from the location array.
     var position = locations[i].location;
     var title = locations[i].title;
     // Create a marker per location, and put into markers array.
      var marker = new window.google.maps.Marker({
       position: position,
       title: title,
       // address:address,
       animation: window.google.maps.Animation.DROP,
       id:i
     });

     // Create an onclick event to open an infowindow at each marker.
     marker.addListener('click', function() {
      let foursquareData;
      if(!foursquareData){
        foursquareData="Coffee Name: "+locations[i].data.name
        foursquareData+="<br>Address: "+locations[i].data.location.formattedAddress
      }else{
        foursquareData="sorry there are no data";
      }
     self.populateInfoWindow(this, largeInfowindow,foursquareData);
     });
     marker.setMap(this.state.map);
     bounds.extend(marker.position);
     this.state.markers.push(marker);
 }
    this.state.map.fitBounds(bounds);

 if(this.props.clickedlistItem){
   this.showClickedItem(largeInfowindow);
 }else{
   console.log("Erooo000oor!!");}

}else{

}
}//End

populateInfoWindow = (marker, largeInfowindow,foursquareData) => {
 // Check to make sure the infowindow is not already opened on this marker.
 if (largeInfowindow.marker !== marker) {
   largeInfowindow.marker = marker;
   largeInfowindow.setContent('<div className="info" tabIndex="0">' + foursquareData + '</div>');
   largeInfowindow.open(this.state.map, marker);
      if(marker){
        if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
        } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(function(){ marker.setAnimation(null); }, 2000);
          }
        }
   // Make sure the marker property is cleared if the infowindow is closed.
   largeInfowindow.addListener('closeclick', function() {
     largeInfowindow.marker = null;
   });
 }
 this.state.InfoWindows.push(largeInfowindow);
}


//if liste View items cliked show marker and Location Info
showClickedItem = (largeInfowindow) => {
 let showItemLocation =  this.props.locations.filter((location)=>{
     return location.title === this.props.clickedlistItem
   })

 if(showItemLocation &&showItemLocation[0]){
   let showItemMarker =  this.state.markers.filter((m)=>{
       return m.title === this.props.clickedlistItem
   })
  let foursquareData ;

  if(!foursquareData){
    foursquareData="Coffee Name: "+showItemLocation[0].data.name
    foursquareData+="<br>Address: "+showItemLocation[0].data.location.formattedAddress
  }else{
    foursquareData="There in No data to show";
  }
   this.populateInfoWindow(showItemMarker[0], largeInfowindow,foursquareData);
 }
}



render() {

return (
this.state.isMapLoaded ?(<div id="map"  tabIndex="-1" role="city" aria-label="Coffee and roastery shops in jeddah"></div>
) :
(<div className="mapError-container" role="application" tabIndex="-1" >Error  in loading map</div>)

);
}

}

export default scriptLoader(
['https://maps.googleapis.com/maps/api/js?key=AIzaSyABoWbagytip4MZGTD_5MIjlD1MzI393aw&v=3.exp&libraries=geometry,drawing,places']
)(Map)
