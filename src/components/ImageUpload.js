import React, { Component } from "react";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      numUploaded: 0
    };
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    this.state.numUploaded += 1;
    let selectedFile = this.state.selectedFile;
    this.setState({ selectedFile: null });
    var myHeaders = new Headers({
      Authorization: "Client-ID d0cb448cf7a7089",
      Authorization: process.env.REACT_APP_BEARER_TOKEN
    });

    let formdata = new FormData();
    formdata.append("image", selectedFile);
    formdata.append("album", "k30VDCy");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    fetch("https://api.imgur.com/3/image", requestOptions)
      .then(response => response.json())
      .then(result =>
        this.props.setImgLink(result.data.link, this.props.imageType)
      )
      .catch(error => console.log("error", error));
  };

  render() {
    console.log("FROM CLEAN", this.props.fromClean);
    let button;
    if (!this.props.fromClean) {
      if (this.state.selectedFile && this.state.numUploaded < 1) {
        button = (
          <div style={{ color: "#f0f2ee", fontWeight: "bold" }}>
            {" "}
            Image selected! please{" "}
            <button onClick={this.onFileUpload}>Upload</button>
          </div>
        );
      } else if (this.state.numUploaded === 1)
        button = (
          <div style={{ color: "#f0f2ee", fontWeight: "bold" }}>
            {" "}
            wait until image appears below, then continue{" "}
          </div>
        );
      else {
        button = (
          <div>
            {" "}
            <form>
              <label
                data-help="Here, upload a photo of the trash site you are reporting"
                onMouseEnter={e =>
                  this.props.inputFocusSetter(
                    e.target.getAttribute("data-help")
                  )
                }
                onMouseLeave={e => this.props.inputFocusSetter("")}
                id="image_upload"
                for="image_input"
              >
                Select image
              </label>
              <input
                id="image_input"
                type="file"
                onChange={this.onFileChange}
                style={{ display: "none" }}
              />
            </form>{" "}
          </div>
        );
      }
    } else {
      if (this.state.selectedFile && this.state.numUploaded < 2) {
        button = (
          <div>
            {" "}
            Image selected! please{" "}
            <button onClick={this.onFileUpload}>Upload</button>
          </div>
        );
      } else if (this.state.numUploaded === 2)
        button = <div> wait until image appears below, then continue </div>;
      else {
        button = (
          <div>
            {" "}
            <form>
              <label id="image_upload" for="image_input">
                Select image
              </label>
              <input
                id="image_input"
                type="file"
                onChange={this.onFileChange}
                style={{ display: "none" }}
              />
            </form>{" "}
          </div>
        );
      }
    }
    return <div>{button}</div>;
  }
}

export default ImageUpload;
