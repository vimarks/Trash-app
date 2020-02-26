import React from "react";
import Map from "./Map";
import "./auth/style.css";

class ReporterMapForm extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      location_id: null,
      description: "",
      bounty: null,
      trash: [],
      dirtyUserTrashCoords: [],
      cleanUserTrashCoords: [],
      markerKey: null,
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
        this.setState({
          trash: data.allTrash,
          dirtyUserTrashCoords: data.dirtyUserTrashCoords,
          cleanUserTrashCoords: data.cleanUserTrashCoords
        });
      });
  };

  patchBounty = newBounty => {
    let id = this.state.trash.filter(
      trash => trash.location_id === this.state.markerKey
    )[0].id;

    fetch("http://localhost:3001/trashes/patchBounty/" + id, {
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

  markerKeyHolder = id => {
    this.state.markerKey !== id
      ? this.setState({
          markerKey: id
        })
      : this.setState({
          markerKey: null
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
    } // else show "insuficient funds"
  };
  handleSubmit = e => {
    e.preventDefault();
    this.patchBounty(this.state.newBounty);
  };
  setDirtyUserCoords = locations => {
    this.setState({
      dirtyUserTrashCoords: locations
    });
  };

  render() {
    console.log(this.state.bounty, this.state.userBalnce, "bounty");
    return (
      <div>
        <div className="text-center bottomForm">
          {this.state.markerKey &&
            this.state.trash
              .filter(tr => tr.location_id === this.state.markerKey)
              .map(tr =>
                tr.cleaned === "clean" ? (
                  <button
                    onClick={() => this.confirmClean(tr.id)}
                    color="primary"
                  >
                    confirm trash pickup
                  </button>
                ) : (
                  <form onSubmit={this.handleSubmit}>
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
                )
              )}
        </div>
        <div id="map">
          <Map
            coords={this.props.coords}
            setDirtyUserCoords={this.setDirtyUserCoords}
            dirtyUserTrashCoords={this.state.dirtyUserTrashCoords}
            cleanUserTrashCoords={this.state.cleanUserTrashCoords}
            markerKeyHolder={this.markerKeyHolder}
            trash={this.state.trash}
          />
        </div>
        {this.state.bounty <= this.state.userBalance ? (
          <div className="text-center">
            <form
              className="text-center bottomForm"
              onSubmit={this.handleTrashSubmit}
            >
              <button onClick={this.saveLocation}>SnapShot Location</button>
              <input
                type="text"
                name="bounty"
                placeholder="bounty"
                value={this.state.bounty}
                onChange={this.handleChange}
                required
              />

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
          </div>
        ) : (
          <div className="text-center">
            <form
              className="text-center bottomForm"
              onSubmit={this.handleTrashSubmit}
            >
              <button onClick={this.saveLocation}>SnapShot Location</button>
              <input
                className="insufficient"
                type="text"
                name="bounty"
                placeholder="bounty"
                value={this.state.bounty}
                onChange={this.handleChange}
                required
              />

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
          </div>
        )}
      </div>
    );
  }
}

export default ReporterMapForm;
