import React from "react";
import { geolocated } from "react-geolocated";
import Map from "./Map"

class MapContainer extends React.Component {
  token = localStorage.getItem('token')

  constructor() {
    super()
    this.state = {
      location_id: null,
      description: '',
      bounty: null,
      allTrash: []

    }
  }

  saveLocation = () => {
    fetch('http://localhost:3001/locations',{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude
      })
    })
        .then(response => {return response.json()})
        .then(locId => {
          this.setState({
            location_id: locId.id
          })
        })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleTrashSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3001/trashes',{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        location_id: this.state.location_id,
        bounty: this.state.bounty,
        cleaned: false,
        description: this.state.description,
        cleaner_id: null,
        reporter_id: localStorage.getItem('currentUser_id')
      })
    })
      .then(response => {return response.json()})
      .then(allTrash => {this.setState({
        allTrash: allTrash
      })
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
          allTrash={this.state.allTrash}
          />

          <button onClick={this.saveLocation}>
           <h3> Mark Location </h3>
         </button>
         <form onSubmit={this.handleTrashSubmit}>
           <input
             type="text"
             name="bounty"
             placeholder="bounty"
             value={this.state.bounty}
             onChange={this.handleChange}
             required
           />

           <input
             type="text"
             name="description"
             placeholder="description"
             value={this.state.description}
             onChange={this.handleChange}
             required
           />

           <button type="submit"> Report Trash </button>
         </form>


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
