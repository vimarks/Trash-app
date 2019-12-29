import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./auth/style.css";

export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: 30.2772641,
    longitude: -97.74286459999999,
    width: "100vw",
    height: "75vh",
    zoom: 10
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/vimarks/ck3z06c3x7ka71dnrk0xjzjnf"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {props.userTrash.length > 0 &&
          props.userTrash.map(loc => (
            <Marker
              key={loc.id}
              latitude={loc.latitude}
              longitude={loc.longitude}
            >
              <button
                className="trash-button"
                onClick={() => props.markerKeyHolder(loc.id)}
              >
                <img alt="trashcan" height="25px" src="/trash_can.png" />
              </button>
            </Marker>
          ))}
      </ReactMapGL>
    </div>
  );
}
