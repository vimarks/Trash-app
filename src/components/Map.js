import React, { useState } from 'react'
import ReactMapGL, { Marker } from "react-map-gl"

export default function Map(props) {
  const[viewport, setViewport] = useState({
    latitude: 30,
    longitude: -97 ,
    width: '50vw',
    height: '75vh',
    zoom: 10
  })


  return(
  <div>
    <ReactMapGL
      {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/vimarks/ck3z06c3x7ka71dnrk0xjzjnf"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
    >
      <Marker
        latitude={props.latitude === undefined ? 30 : props.latitude}
        longitude={props.longitude === undefined ? -97 :props.longitude}
      >

      <button onClick={(e) => {
      }}>
        #@!TRASH
      </button>
      </Marker>
    </ReactMapGL>
   </div>
 )
}
