import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, { Marker, Popup } from "react-map-gl";
import "./auth/style.css";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class SaveLocation extends Component {
  token = localStorage.getItem("token");
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude,
        zoom: 15,
        bearing: 0,
        pitch: 0
      },
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude
    };
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _onMarkerDragEnd = event => {
    this.setState({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
  };

  saveLocation = () => {
    fetch("https://trash-app-back.herokuapp.com/locations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude
      })
    })
      .then(response => {
        return response.json();
      })
      .then(locId => {
        this.props.setLocationId(locId.id);
        this.props.setUserProgress();
      });
  };
  render() {
    const { viewport } = this.state;

    return (
      <div>
        <div id="save_location_instructions">
          Double click or touch the icon and drag it to the desired location,
          then
          <button onClick={this.saveLocation}> Continue </button>
        </div>
        <MapGL
          {...viewport}
          width="100vw"
          height="75vh"
          mapStyle="mapbox://styles/vimarks/ck5dbg0mo05rh1joioksl2b41"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          <Marker
            key={1}
            longitude={this.state.longitude}
            latitude={this.state.latitude}
            offsetTop={-20}
            offsetLeft={-10}
            draggable={true}
            onDragEnd={this._onMarkerDragEnd}
          >
            <img
              alt="trashcan"
              height="20px"
              src=" https://img.icons8.com/color/48/000000/marker.png"
            />
          </Marker>
        </MapGL>
      </div>
    );
  }
}

export function renderToDom(container) {
  render(<SaveLocation />, container);
}
