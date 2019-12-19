import React from "react";
import { geolocated } from "react-geolocated";
import CleanerMap from "./CleanerMap"
import CleanerCard from "./CleanerCard"

class CleanerMapContainer extends React.Component {
  token = localStorage.getItem('token')

  constructor() {
    super()
    this.state = {
      trashLocations: [],
      trash: [],
      markerKey: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/trashes',{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }})
      .then(response => {return response.json()})
      .then(data => { this.setState({
        trashLocations: data.trashLocations,
        trash: data.trash,
        id: this.state.markerKey
      })
    })
  }

  cleanTrash = id => {
    fetch('http://localhost:3001/trashes/' + id, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        cleaner_id: localStorage.getItem('currentUser_id')
      })
    })
    .then(response => {return response.json()})
    .then(data => {this.setState({
      trash: data.allTrash
      })
    })


  }


  markerKeyHolder = id => {
    !this.state.markerKey
      ? this.setState({
        markerKey: id
        })
      : this.setState({
        markerKey: null
      })
  }

  compareLocation = () => {

  }

    render() {

        return(
           !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
          <div>

          <CleanerMap
          trashLocations={this.state.trashLocations}
          markerKeyHolder={this.markerKeyHolder}
          />

          {this.state.trash.length > 0 && this.state.trash
            .filter(trash => trash.location_id === this.state.markerKey)
            .map(trash => (
              <CleanerCard
              cleanTrash={this.cleanTrash}
              id={trash.id}
              description={trash.description}
              bounty={trash.bounty}
              cleaned={trash.cleaned}
              reporter_id={trash.reporter_id}
              />
            ))}


          <button onClick={this.compareLocation}>
           <h3> Compare Location </h3>
         </button>
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
})(CleanerMapContainer);
