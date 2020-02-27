import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, { Marker, Popup } from "react-map-gl";
import "./auth/style.css";

const TOKEN =
  "pk.eyJ1IjoidmltYXJrcyIsImEiOiJjazN5d2F0bjMwMnBwM2xtenVpZnJwOWs5In0.XMP3lHS4L14pf2FKCiV_3g"; // Set your mapbox token here

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class Map extends Component {
  token = localStorage.getItem("token");
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude,
        zoom: 10,
        bearing: 0,
        pitch: 0
      },

      selectedLocation: null
    };
  }
  setSelectedLocation = loc => {
    this.setState({
      selectedLocation: loc
    });
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _onMarkerDragEnd = event => {
    console.log(this.state.selectedLocation);
    if (this.state.selectedLocation) {
      let id = this.state.selectedLocation.id;
      fetch("http://localhost:3001/locations/" + id, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          latitude: event.lngLat[1],
          longitude: event.lngLat[0],
          reporter_id: localStorage.getItem("currentUser_id")
        })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.props.setDirtyUserCoords(data.dirtyUserTrashCoords);
        });
    }
  };

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="75vh"
        mapStyle="mapbox://styles/vimarks/ck5dbg0mo05rh1joioksl2b41"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {this.props.dirtyUserTrashCoords.length > 0 &&
          this.props.dirtyUserTrashCoords.map(loc => (
            <Marker
              key={loc.id}
              longitude={loc.longitude}
              latitude={loc.latitude}
              offsetTop={-20}
              offsetLeft={-10}
              draggable
              onDragEnd={this._onMarkerDragEnd}
            >
              <button
                className="trash-button"
                onClick={e => {
                  e.preventDefault();
                  this.setSelectedLocation(loc);
                  this.props.markerKeyHolder(loc.id);
                }}
              >
                <img alt="trashcan" height="20px" src="/trash_can.png" />
              </button>
            </Marker>
          ))}
        {this.props.cleanUserTrashCoords.length > 0 &&
          this.props.cleanUserTrashCoords.map(loc => (
            <Marker
              key={loc.id}
              longitude={loc.longitude}
              latitude={loc.latitude}
              offsetTop={-20}
              offsetLeft={-10}
              draggable
              onDragEnd={this._onMarkerDragEnd}
              setMarker
            >
              <button
                className="trash-button"
                onClick={e => {
                  e.preventDefault();
                  this.setSelectedLocation(loc);
                  this.props.markerKeyHolder(loc.id);
                }}
              >
                <img alt="trashcan" height="26px" src="/2107157.png" />
              </button>
            </Marker>
          ))}
        {this.state.selectedLocation &&
          this.props.trash
            .filter(tr => tr.location_id === this.state.selectedLocation.id)
            .map(tr => (
              <Popup
                latitude={this.state.selectedLocation.latitude}
                longitude={this.state.selectedLocation.longitude}
                onClose={() => {
                  this.setState({
                    selectedLocation: null
                  });
                }}
              >
                <div>
                  <h2>{tr.bounty} kP$</h2>
                  <p>{tr.description}</p>
                  <p>{tr.cleaned}</p>
                </div>
              </Popup>
            ))}
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<Map />, container);
}
