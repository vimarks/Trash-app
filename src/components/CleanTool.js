import React from "react";
import ImageUpload from "./ImageUpload.js";
class CleanTool extends React.Component {
  token = localStorage.getItem("token");
  constructor(props) {
    super(props);
    this.state = {
      locVerify: false,
      attempted: false,
      beforeImgLink: "",
      afterImgLink: ""
    };
  }

  compareLocation = id => {
    let cleanerLocation = this.props.dirtyTrashLocations.filter(
      loc => loc.id === this.props.location_id
    );

    let a = cleanerLocation[0].latitude;
    let b = this.props.currentLocation.latitude;
    let latDiff = Math.abs(a - b);

    let x = cleanerLocation[0].longitude;
    let y = this.props.currentLocation.longitude;
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
    // redirect to myTrash/awaitingConfirmation
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
    let { locVerify, attempted, beforeImgLink, afterImgLink } = this.state;
    let button, visibleComp, beforeImage, afterImage;

    if (beforeImgLink) {
      beforeImage = <img id="titleImgPreview" src={beforeImgLink} />;
    }
    if (afterImgLink) {
      afterImage = <img id="titleImgPreview" src={afterImgLink} />;
    }
    if (!locVerify && !attempted) {
      button = (
        <button onClick={() => this.compareLocation(this.props.trash_id)}>
          {" "}
          compare location{" "}
        </button>
      );
    } else if (!locVerify && attempted) {
      button = (
        <button onClick={() => this.setState({ attempted: false })}>
          {" "}
          try again{" "}
        </button>
      );
    } else if (locVerify && !beforeImgLink && !afterImgLink) {
      visibleComp = (
        <div>
          <h1>upload before image</h1>
          <ImageUpload imageType={"before"} setImgLink={this.setImgLink} />
        </div>
      );
    } else if (locVerify && beforeImgLink && !afterImgLink) {
      visibleComp = (
        <div>
          <h1>upload after image</h1>
          <ImageUpload imageType={"after"} setImgLink={this.setImgLink} />
        </div>
      );
    } else {
      button = <button onClick={() => this.saveAndClean()}>clean it </button>;
    }
    return (
      <div>
        {visibleComp}
        {beforeImage}
        {afterImage}
        {button}
      </div>
    );
  }
}

export default CleanTool;
