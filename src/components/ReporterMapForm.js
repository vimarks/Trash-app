import React from "react";
import Map from "./Map";
import ImageUpload from "./ImageUpload";
import ReporterForm from "./ReporterForm";
import "./auth/style.css";

class ReporterMapForm extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      selectedLocation: null,
      location_id: null,
      description: "",
      bounty: null,
      imageLink: null,
      trash: [],
      dirtyUserTrashCoords: [],
      cleanUserTrashCoords: [],
      popupStatus: false,
      newBounty: 0,
      userBalance: null
    };
  }

  componentDidMount() {
    this.initialRFetch();
  }

  initialRFetch = () => {
    fetch("http://localhost:3001/trashes/getUserTrashCoords", {
      method: "POST",
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
          dirtyUserTrashCoords: data.dirtyUserTrashCoords,
          cleanUserTrashCoords: data.cleanUserTrashCoords,
          trash: data.trash,
          userBalance: data.userBalance
        });
      });
  };

  confirmClean = id => {
    fetch("http://localhost:3001/trashes/" + id, {
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
        this.setSelectedLocation(null);
        this.setState({
          trash: data.allTrash,
          dirtyUserTrashCoords: data.dirtyUserTrashCoords,
          cleanUserTrashCoords: data.cleanUserTrashCoords
        });
      });
  };

  patchBounty = newBounty => {
    let filtered = this.state.trash.filter(
      trash => trash.location_id === this.state.selectedLocation.id
    );
    let id;
    if (filtered[0]) {
      id = filtered[0].id;
    }

    fetch("https://trash-app-back.herokuapp.com/trashes/patchBounty/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        bounty: newBounty
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

  saveLocation = () => {
    fetch("http://localhost:3001/locations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude
      })
    })
      .then(response => {
        return response.json();
      })
      .then(locId => {
        this.setState({
          location_id: locId.id
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleTrashSubmit = event => {
    event.preventDefault();

    if (this.state.userBalance > this.state.bounty) {
      this.saveLocation();
      fetch("http://localhost:3001/trashes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
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
          this.setState({
            trash: data.trash,
            dirtyUserTrashCoords: data.dirtyUserTrashCoords,
            cleanUserTrashCoords: data.cleanUserTrashCoords
          });
        });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.patchBounty(this.state.newBounty);
  };

  setDirtyUserTrashCoords = locations => {
    this.setState({
      dirtyUserTrashCoords: locations
    });
  };
  setPopupStatus = (bool, loc) => {
    this.setState({
      popupStatus: bool,
      selectedLocation: loc
    });
  };
  setSelectedLocation = loc => {
    if (loc && this.state.selectedLocation) {
      if (this.state.selectedLocation.id !== loc.id) {
        this.setState({
          selectedLocation: loc,
          popupStatus: false
        });
      }
    } else {
      this.setState({
        selectedLocation: loc
      });
    }
  };

  setImageLink = link => {
    this.setState({
      imageLink: link
    });
  };

  render() {
    let bottomForm;
    if (this.state.selectedLocation) {
      let filtered = this.state.trash.filter(
        tr => tr.location_id === this.state.selectedLocation.id
      );

      if (filtered[0].cleaned === "clean") {
        this.state.trash
          .filter(tr => tr.location_id === this.state.selectedLocation.id)
          .map(tr => {
            bottomForm = (
              <button onClick={() => this.confirmClean(tr.id)} color="primary">
                confirm trash pickup
              </button>
            );
          });
      } else {
        bottomForm = (
          <div>
            <form id="changeBountyForm" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="reset bounty"
                value={this.state.newBounty}
                onChange={e =>
                  this.setState({
                    newBounty: e.target.value
                  })
                }
              />
              <input type="submit" value="Change Bounty" />
            </form>
          </div>
        );
      }
    } else {
      let bountyInput;
      if (this.state.bounty > this.state.userBalance) {
        bountyInput = (
          <input
            className="insufficient"
            type="text"
            name="bounty"
            placeholder="bounty"
            value={this.state.bounty}
            onChange={this.handleChange}
            required
          />
        );
      } else {
        bountyInput = (
          <input
            type="text"
            name="bounty"
            placeholder="bounty"
            value={this.state.bounty}
            onChange={this.handleChange}
            required
          />
        );
      }
      bottomForm = (
        <form
          className="text-center bottomForm"
          onSubmit={this.handleTrashSubmit}
        >
          <button onClick={this.saveLocation}>SnapShot Location</button>
          {bountyInput}
          <input
            type="text"
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <button type="submit"> Report Trash</button>
        </form>
      );
    }

    return (
      <div>
        <div
          className="map"
          onClick={e => {
            e.preventDefault();
            this.setPopupStatus(false, null);
          }}
        >
          <Map
            coords={this.props.coords}
            popupStatus={this.state.popupStatus}
            setPopupStatus={this.setPopupStatus}
            setDirtyUserTrashCoords={this.setDirtyUserTrashCoords}
            dirtyUserTrashCoords={this.state.dirtyUserTrashCoords}
            cleanUserTrashCoords={this.state.cleanUserTrashCoords}
            setSelectedLocation={this.setSelectedLocation}
            selectedLocation={this.state.selectedLocation}
            trash={this.state.trash}
          />
        </div>
        <div className="text-center bottomForm"> {bottomForm} </div>
      </div>
    );
  }
}

export default ReporterMapForm;
