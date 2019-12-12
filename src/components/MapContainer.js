import React from "react";
import { geolocated } from "react-geolocated";
import Map from "./Map"

class MapContainer extends React.Component {

  saveLocation = () => {
    console.log("saving location")
    fetch('http://localhost:3001/locations',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude
      })
    })
      .then(response => {
    return response.json();
      })
      .then(locObj => {
      console.log(locObj);
  })

  }

    render() {
      console.log(this.props.coords)
        return(
           !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
          <div>

          <Map
          latitude={this.props.coords.latitude}
          longitude={this.props.coords.longitude}
          />
          <button onClick={this.saveLocation}>
           <h3> Mark Location </h3>
         </button>

          </div>

        ) : (
            <div>Getting the location data&hellip; </div>
        )


      )
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(MapContainer);
