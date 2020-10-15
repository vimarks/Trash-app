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

  mouseEventHandler = (event, loc) => {
    if (event.type === "mousedown") {
      this.props.setSelectedLocation(loc);
    }
    if (event.type === "dblclick") {
      this.props.setPopupStatus(true, loc);
    }
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _onMarkerDragEnd = event => {
    if (this.props.selectedLocation) {
      let id = this.props.selectedLocation.id;
      fetch("https://trash-app-back.herokuapp.com/locations/" + id, {
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
          this.props.setDirtyUserTrashCoords(data.dirtyUserTrashCoords);
          this.props.setSelectedLocation(null);
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
        {this.props.dirtyUserTrashCoords &&
          this.props.dirtyUserTrashCoords.map(loc => (
            <Marker
              key={loc.id}
              longitude={loc.longitude}
              latitude={loc.latitude}
              offsetTop={-20}
              offsetLeft={-10}
              draggable={true}
              onDragEnd={this._onMarkerDragEnd}
            >
              <button
                className="trash-button"
                onMouseDown={e => {
                  e.preventDefault();
                  this.mouseEventHandler(e, loc);
                }}
                onDoubleClick={e => {
                  this.mouseEventHandler(e, loc);
                }}
              >
                <img alt="trashcan" height="20px" src="/trash_can.png" />
              </button>
            </Marker>
          ))}
        {this.props.cleanUserTrashCoords &&
          this.props.cleanUserTrashCoords.map(loc => (
            <Marker
              key={loc.id}
              longitude={loc.longitude}
              latitude={loc.latitude}
              offsetTop={-20}
              offsetLeft={-10}
              setMarker
            >
              <button
                className="trash-button"
                onClick={e => {
                  e.preventDefault();
                  this.props.setSelectedLocation(loc);
                }}
              >
                <img alt="cleanIcon" height="26px" src="/2107157.png" />
              </button>
            </Marker>
          ))}
        {this.props.selectedLocation &&
          this.props.popupStatus &&
          this.props.trash
            .filter(tr => tr.location_id === this.props.selectedLocation.id)
            .map(tr => (
              <Popup
                latitude={this.props.selectedLocation.latitude}
                longitude={this.props.selectedLocation.longitude}
                onClose={() => {
                  this.props.setPopupStatus(false);
                  this.props.setSelectedLocation(null);
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
