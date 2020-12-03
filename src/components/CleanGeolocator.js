import React from "react";
import { geolocated } from "react-geolocated";
import CleanerMapForm from "./CleanerMapForm";
import Gallery from "./Gallery";

class CleanGeolocator extends React.Component {
  token = localStorage.getItem("token");
  constructor() {
    super();
    this.state = {
      displayMode: "gallery",
      dirtyTrashLocations: [],
      cleanTrashLocations: [],
      confirmedTrashLocations: [],
      trash: [],
      users: [],
      reputations: [],
      allImages: []
    };
  }

  componentDidMount() {
    this.initialCFetch();
  }

  initialCFetch = () => {
    fetch("http://localhost:3001/trashes/initialCFetch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        cleaner_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          confirmedTrashLocations: data.confirmedTrashLocations,
          dirtyTrashLocations: data.dirtyTrashLocations,
          cleanTrashLocations: data.cleanTrashLocations,
          trash: data.trash,
          users: data.users,
          reputations: data.reputations,
          allImages: data.images
        });
      });
  };

  editFetch = (patchBody, trash_id) => {
    let id = trash_id;
    fetch("http://localhost:3001/trashes/patchBounty/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        patchBody
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          trash: data.allTrash
        });
      });
  };

  setDisplayMode = mode => {
    this.setState({ displayMode: mode });
  };

  cleanTrash = id => {
    fetch("http://localhost:3001/trashes/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        cleaner_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          trash: data.allTrash,
          dirtyTrashLocations: data.dirtyTrashLocations,
          cleanTrashLocations: data.cleanTrashLocations
        });
      });
  };

  render() {
    let button, visibleComp;
    if (this.state.displayMode === "gallery") {
      button = (
        <button onClick={() => this.setDisplayMode("map")}> map </button>
      );
      visibleComp = (
        <Gallery
          editFetch={this.editFetch}
          setDisplayMode={this.setDisplayMode}
          type={"cleanGeo"}
          cleanTrash={this.cleanTrash}
          currentLocation={this.props.coords}
          dirtyTrashLocations={this.state.dirtyTrashLocations}
          allTrash={this.state.trash}
          allImages={this.state.allImages}
        />
      );
    } else {
      button = (
        <button onClick={() => this.setDisplayMode("gallery")}>
          {" "}
          gallery{" "}
        </button>
      );
      visibleComp = (
        <CleanerMapForm
          editFetch={this.editFetch}
          cleanTrash={this.cleanTrash}
          currentLocation={this.props.coords}
          dirtyTrashLocations={this.state.dirtyTrashLocations}
          allTrash={this.state.trash}
          allImages={this.state.allImages}
          users={this.state.users}
          reputations={this.state.reputations}
        />
      );
    }

    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        {button}
        {visibleComp}
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(CleanGeolocator);
