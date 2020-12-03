import React from "react";
import { geolocated } from "react-geolocated";
import SaveLocation from "./SaveLocation";
import ReporterForm from "./ReporterForm";
import TrashPostPreview from "./TrashPostPreview";

class ReportGeolocator extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      userProgress: 0,
      postingTitle: "",
      description: "",
      bounty: "",
      titleImgLink: "",
      beforeImgLink: "",
      afterImgLink: "",
      location_id: null,
      userBalance: null
    };
  }

  setUserProgress = () => {
    this.setState({
      userProgress: this.state.userProgress + 1
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  setImgLink = (link, type) => {
    let imgLink = `${type}ImgLink`;
    this.setState({
      [imgLink]: link
    });
  };

  setLocationId = locId => {
    this.setState({
      location_id: locId
    });
  };

  saveTrash = () => {
    fetch("http://localhost:3001/trashes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        postingTitle: this.state.postingTitle,
        location_id: this.state.location_id,
        bounty: this.state.bounty,
        cleaned: "dirty",
        description: this.state.description,
        cleaner_id: null,
        reporter_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("DATA", data.id);
        this.saveImage(data.id, "title");
        this.setUserProgress();
      });
  };

  saveImage = (trash_id, image_type) => {
    let imgLink = `${image_type}ImgLink`;
    fetch("http://localhost:3001/images", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        image_type: image_type,
        trash_id: trash_id,
        url: this.state[imgLink]
      })
    });
  };
  render() {
    if (this.props.coords) {
      localStorage.setItem("lat", this.props.coords.latitude);
      localStorage.setItem("long", this.props.coords.longitude);
    }
    let progressButton, visibleComp;
    if (this.state.userProgress === 0) {
      visibleComp = (
        <ReporterForm
          setImgLink={this.setImgLink}
          handleChange={this.handleChange}
          titleImgLink={this.state.titleImgLink}
          postingTitle={this.state.postingTitle}
          bounty={this.state.bounty}
          description={this.state.description}
        />
      );
      progressButton = (
        <button onClick={this.setUserProgress}> Continue </button>
      );
    } else if (this.state.userProgress === 1) {
      visibleComp = (
        <SaveLocation
          coords={this.props.coords}
          setUserProgress={this.setUserProgress}
          setLocationId={this.setLocationId}
        />
      );
    } else if (this.state.userProgress === 2) {
      visibleComp = (
        <TrashPostPreview
          titleImgLink={this.state.titleImgLink}
          postingTitle={this.state.postingTitle}
          description={this.state.description}
          bounty={this.state.bounty}
          locationId={this.state.locationId}
        />
      );
      progressButton = <button onClick={this.saveTrash}>Publish</button>;
    } else {
      visibleComp = <h1> your post is published, see listing at ... </h1>;
    }
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        {visibleComp}
        {progressButton}
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
})(ReportGeolocator);
