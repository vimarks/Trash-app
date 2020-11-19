import React, { Component } from "react";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    var myHeaders = new Headers({
      Authorization: "Client-ID d0cb448cf7a7089",
      Authorization: process.env.REACT_APP_BEARER_TOKEN
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
      .then(result =>
        this.props.setImgLink(result.data.link, this.props.imageType)
      )
      .catch(error => console.log("error", error));
  };

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
        {button}
      </div>
    );
  }
}

export default ImageUpload;
