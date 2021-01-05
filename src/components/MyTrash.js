import React from "react";
import Gallery from "./Gallery";
import Map from "./Map";
import ClickedCard from "./ClickedCard";
import Nav from "../containers/Nav";
import { withRouter } from "react-router-dom";

class MyTrash extends React.Component {
  token = localStorage.getItem("token");

  constructor(props) {
    super(props);
    this.state = {
      displayMode: "gallery",
      allTrash: [],
      allUsers: [],
      allImages: [],
      allReputations: [],
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
      cardStatus: "",
      markerKey: null
    };
  }

  componentDidMount() {
    this.myTrash();
  }

  myTrash = () => {
    fetch("https://trash-app-back.herokuapp.com/trashes/myTrash", {
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
        this.setState({
          allTrash: data.allTrash,
          allUsers: data.allUsers,
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
          allImages: data.allImages,
          allReputations: data.allReputations
        });
      });
  };

  confirmClean = id => {
    fetch("https://trash-app-back.herokuapp.com/trashes/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        reporter_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          pending_your_confirm: data.pending_your_confirm,
          report_success: data.report_success,
          allTrash: data.trash
        });
        this.props.updateWallet();
      });
  };

  editFetch = (patchBody, trash_id) => {
    let id = trash_id;
    fetch("https://trash-app-back.herokuapp.com/trashes/patchBounty/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        patchBody,
        currentUser_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          allTrash: data.allTrash,
          pending_clean: data.pending_clean
        });
      });
  };

  setDisplayMode = mode => {
    this.setState({ displayMode: mode });
  };

  markerKeyHolder = (id, key) => {
    if (key) key = key.slice(0, key.length - 7);
    this.state.markerKey !== id
      ? this.setState({
          cardStatus: key,
          markerKey: id
        })
      : this.setState({
          cardStatus: "",
          markerKey: null
        });
  };

  render() {
    let visibleComp, button;
    if (this.state.displayMode === "gallery") {
      button = (
        <button onClick={() => this.setDisplayMode("map")}>see map</button>
      );
      visibleComp = (
        <Gallery
          confirmClean={this.confirmClean}
          editFetch={this.editFetch}
          setDisplayMode={this.setDisplayMode}
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
    } else if (this.state.displayMode === "map") {
      button = (
        <button onClick={() => this.setDisplayMode("gallery")}>
          {" "}
          see gallery{" "}
        </button>
      );
      visibleComp = (
        <Map
          myTrashLocsObj={{
            clean_success_coords: {
              locations: this.state.clean_success_coords,
              icon: "2107157.png"
            },
            report_success_coords: {
              locations: this.state.report_success_coords,
              icon: "confirmed_icon.png"
            },
            pending_clean_coords: {
              locations: this.state.pending_clean_coords,
              icon: "trash_can.png"
            },
            pending_your_confirm_coords: {
              locations: this.state.pending_your_confirm_coords,
              icon: "questionMark.png"
            },
            pending_their_confirm_coords: {
              locations: this.state.pending_their_confirm_coords,
              icon: "clock.svg"
            }
          }}
          markerKeyHolder={this.markerKeyHolder}
          setDisplayMode={this.setDisplayMode}
          users={this.state.allUsers}
          reputations={this.state.allReputations}
          allTrash={this.state.allTrash}
        />
      );
    } else {
      button = (
        <button
          onClick={() => {
            this.setDisplayMode("gallery");
            this.markerKeyHolder(null);
          }}
        >
          {" "}
          see gallery{" "}
        </button>
      );
      let clickedTrash = this.state.allTrash.filter(
        trash => trash.location_id === this.state.markerKey
      )[0];
      let images = this.state.allImages.filter(
        img => img.trash_id === clickedTrash.id
      );
      visibleComp = (
        <ClickedCard
          editFetch={this.editFetch}
          markerKeyHolder={this.markerKeyHolder}
          setDisplayMode={this.setDisplayMode}
          from={"map"}
          cardStatus={this.state.cardStatus}
          images={images}
          title={clickedTrash.title}
          bounty={clickedTrash.bounty}
          description={clickedTrash.description}
          reporter_id={clickedTrash.reporter_id}
          trash_id={clickedTrash.id}
          status={clickedTrash.cleaned}
          created_at={clickedTrash.created_at}
        />
      );
    }

    return (
      <div>
        <div id="map_gallery_button">{button}</div>
        {visibleComp}
      </div>
    );
  }
}
export default withRouter(MyTrash);
