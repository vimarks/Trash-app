import React from "react";
import "../App.css";
import CleanerGeolocator from "../components/CleanerGeolocator";

class CleanContainer extends React.Component {
  render() {
    return (
      <div>
        <CleanerGeolocator />
      </div>
    );
  }
}

export default CleanContainer;
