import React from "react";
import { geolocated } from "react-geolocated";
import CleanerMapContainer from "./CleanerMapContainer";

class Geolocator extends React.Component {
  render() {
    console.log(this.props.coords);
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        <CleanerMapContainer coords={this.props.coords} />
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(Geolocator);
