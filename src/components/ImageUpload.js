import React, { Component } from "react";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    // Request made to the backend api
    var myHeaders = new Headers({
      Authorization: "Client-ID d0cb448cf7a7089",
      Authorization: "Bearer 73230c12b938bb1830594f5584465428668f9c53"
    });

    let formdata = new FormData();
    formdata.append("image", this.state.selectedFile);
    formdata.append("album", "k30VDCy");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    fetch("https://api.imgur.com/3/image", requestOptions)
      .then(response => response.json())
      .then(result => this.props.setImageLink(result.data.link))
      .catch(error => console.log("error", error));
  };

  // File content to be displayed after
  // file upload is complete

  render() {
    let button;
    if (this.state.selectedFile) {
      button = <button onClick={this.onFileUpload}>Upload!</button>;
    } else {
      button = <div> please select image </div>;
    }
    return (
      <div>
        <form>
          <input id="imageUpload" type="file" onChange={this.onFileChange} />
        </form>
        <br />
      </div>
    );
  }
}

export default ImageUpload;
