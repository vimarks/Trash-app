import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./auth/style.css";

export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: 30.2772641,
    longitude: -97.74286459999999,
    width: "100vw",
    height: "75vh",
    zoom: 10
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  console.log(selectedLocation);
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/vimarks/ck5dbg0mo05rh1joioksl2b41"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {props.userTrashCoords.length > 0 &&
          props.userTrashCoords.map(loc => (
            <Marker
              key={loc.id}
              latitude={loc.latitude}
              longitude={loc.longitude}
            >
              <button
                className="trash-button"
                onClick={e => {
                  e.preventDefault();
                  setSelectedLocation(loc);
                  props.markerKeyHolder(loc);
                }}
              >
                <img alt="trashcan" height="25px" src="/trash_can.png" />
              </button>
            </Marker>
          ))}
        {selectedLocation &&
          props.trash
            .filter(tr => tr.location_id === selectedLocation.id)
            .map(tr => (
              <Popup
                latitude={selectedLocation.latitude}
                longitude={selectedLocation.longitude}
                onClose={() => {
                  setSelectedLocation(null);
                }}
              >
                <div>
                  <h2>{tr.bounty} kP$</h2>
                  <p>{tr.description}</p>
                  <p>{tr.cleaned}</p>
                </div>
              </Popup>
            ))}
      </ReactMapGL>
    </div>
  );
}
