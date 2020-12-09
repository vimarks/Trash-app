import React, { useState } from "react";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./auth/style.css";

export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: Number(localStorage.getItem("lat")),
    longitude: Number(localStorage.getItem("long")),
    width: "100vw",
    height: "75vh",
    zoom: 10
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  let trObj;
  if (props.fromCleanerSide) {
    trObj = {
      pending_clean: {
        locations: props.dirtyTrashLocations,
        icon: "trash_can.png"
      }
    };
  } else {
    trObj = props.myTrashLocsObj;
  }
  let keys = Object.keys(trObj),
    icon,
    marker,
    markers = [];
  for (let key of keys) {
    icon = trObj[key].icon;
    marker =
      trObj[key].locations &&
      trObj[key].locations.map(loc => {
        return (
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
                props.markerKeyHolder(loc.id, key);
              }}
            >
              <img alt={key} height="20px" src={icon} />
            </button>
          </Marker>
        );
      });
    markers = markers.concat(marker);
  }
  console.log("MARKERS", markers);

  const avgRating = reporter_id => {
    let userRep = props.reputations.filter(rep => rep.user_id === reporter_id);
    if (userRep.length > 0) {
      let avgRating =
        userRep
          .map(rep => rep.rating)
          .reduce(function(a, b) {
            return a + b;
          }) / userRep.length;

      return avgRating;
    } else return 0;
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/vimarks/ck5edmyhu0vv81jo6qxc2bjh3"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {markers}

        {selectedLocation &&
          props.allTrash
            .filter(tr => tr.location_id === selectedLocation.id)
            .map(tr => (
              <Popup
                key={tr.id}
                latitude={selectedLocation.latitude}
                longitude={selectedLocation.longitude}
                closeOnClick={false}
                onClose={() => {
                  setSelectedLocation(null);
                  props.markerKeyHolder(null);
                }}
              >
                <div>
                  <h2>{tr.bounty} kP$</h2>
                  <p>{tr.description}</p>
                  <p>
                    Reporter:{" "}
                    {
                      props.users.filter(user => user.id === tr.reporter_id)[0]
                        .username
                    }
                  </p>
                  <p>Rating: {avgRating(tr.reporter_id)} / 5</p>

                  <button
                    onClick={e => {
                      props.setDisplayMode("clickedCard");
                    }}
                  >
                    {" "}
                    see post{" "}
                  </button>
                </div>
              </Popup>
            ))}
      </ReactMapGL>
    </div>
  );
}
