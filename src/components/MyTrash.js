import React from "react";
import Gallery from "./Gallery";
import Map from "./Map";

class MyTrash extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      displayMode: "gallery",
      allTrash: [],
      clean_success: [],
      clean_success_coords: [],
      pending_their_confirm: [],
      pending_their_confirm_coords: [],
      report_success: [],
      report_success_coords: [],
      pending_clean: [],
      pending_clean_coords: [],
      pending_your_confirm: [],
      pending_your_confirm_coords: [],
      userBalance: null,
      allUsers: [],
      allImages: []
    };
  }

  componentDidMount() {
    this.myTrash();
  }

  myTrash = () => {
    console.log("myTrash HIT");
    fetch("http://localhost:3001/trashes/myTrash", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        currentUser_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("data", data);
        this.setState({
          allTrash: data.allTrash,
          clean_success: data.clean_success,
          clean_success_coords: data.clean_success_coords,
          pending_their_confirm: data.pending_their_confirm,
          pending_their_confirm_coords: data.pending_their_confirm_coords,
          report_success: data.report_success,
          report_success_coords: data.report_success_coords,
          pending_clean: data.pending_clean,
          pending_clean_coords: data.pending_clean_coords,
          pending_your_confirm: data.pending_your_confirm,
          pending_your_confirm_coords: data.pending_your_confirm_coords,
          userBalance: data.wallet_balance,
          allImages: data.allImages
        });
      });
  };

  render() {
    let visibleComp;
    if (this.state.displayMode === "gallery") {
      visibleComp = (
        <Gallery
          type={"myTrash"}
          myTrashObj={{
            clean_success: this.state.clean_success,
            report_success: this.state.report_success,
            pending_clean: this.state.pending_clean,
            pending_your_confirm: this.state.pending_your_confirm,
            pending_their_confirm: this.state.pending_their_confirm
          }}
          allTrash={this.state.allTrash}
          allImages={this.state.allImages}
        />
      );
    }
    return <div>{visibleComp}</div>;
  }
}
export default MyTrash;
