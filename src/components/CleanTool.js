import React from "react";
import { geolocated } from "react-geolocated";
import ImageUpload from "./ImageUpload.js";
import { withRouter } from "react-router-dom";

class CleanTool extends React.Component {
  token = localStorage.getItem("token");
  constructor(props) {
    super(props);
    this.state = {
      locVerify: false,
      attempted: false,
      beforeImgLink: "",
      afterImgLink: "",
      complete: false
    };
  }

  compareLocation = id => {
    let trashLocation = this.props.dirtyTrashLocations.filter(
      loc => loc.id === this.props.location_id
    )[0];

    let a = trashLocation.latitude;
    let b = this.props.coords.latitude;
    let latDiff = Math.abs(a - b);

    let x = trashLocation.longitude;
    let y = this.props.coords.longitude;
    let lonDiff = Math.abs(x - y);

    if (latDiff < 0.00019 && lonDiff < 0.00019) {
      this.setState({
        locVerify: true
      });
    } else {
      this.setState({
        attempted: true
      });
    }
  };

  setImgLink = (link, type) => {
    let imgLink = `${type}ImgLink`;
    this.setState({
      [imgLink]: link
    });
  };

  saveAndClean = () => {
    this.saveImage(this.props.trash_id, "before");
    this.saveImage(this.props.trash_id, "after");
    this.props.cleanTrash(this.props.trash_id);
    this.setState({ complete: true });
    alert("Trash has been cleaned!\nReporter will be notified.");
    this.props.history.push("/mytrash");
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
    let {
      locVerify,
      attempted,
      beforeImgLink,
      afterImgLink,
      complete
    } = this.state;
    let button, visibleComp, beforeImage, afterImage;

    if (beforeImgLink) {
      beforeImage = <img id="titleImgPreview" src={beforeImgLink} />;
    }
    if (afterImgLink) {
      afterImage = <img id="titleImgPreview" src={afterImgLink} />;
    }
    if (!locVerify && !attempted) {
      button = (
        <div id="clean_directions">
          <p>
            The first step is to prove that you are in the vicinity of the
            trash, click the button below when you are within 10 feet.
          </p>
          <button onClick={() => this.compareLocation(this.props.trash_id)}>
            {" "}
            compare location{" "}
          </button>
        </div>
      );
    } else if (!locVerify && attempted) {
      button = (
        <div id="clean_directions">
          <p>
            Your coordinates do not match those of the trash you are attempting
            to clean, please try again.
          </p>
          <button onClick={() => this.setState({ attempted: false })}>
            {" "}
            try again{" "}
          </button>
        </div>
      );
    } else if (locVerify && !beforeImgLink && !afterImgLink) {
      visibleComp = (
        <div>
          <h1>Please select a "BEFORE" image</h1>
          <ImageUpload
            fromClean={true}
            imageType={"before"}
            setImgLink={this.setImgLink}
          />
        </div>
      );
    } else if (locVerify && beforeImgLink && !afterImgLink) {
      visibleComp = (
        <div>
          <h1>Please select an "AFTER" image</h1>
          <ImageUpload
            fromClean={true}
            imageType={"after"}
            setImgLink={this.setImgLink}
          />
        </div>
      );
    } else if (!complete) {
      button = <button onClick={() => this.saveAndClean()}>clean it </button>;
    }
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div id="clean_form">
        {visibleComp}
        {beforeImage}
        {afterImage}
        {button}
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
})(withRouter(CleanTool));
