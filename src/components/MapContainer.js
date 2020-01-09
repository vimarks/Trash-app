import React from "react";
import Map from "./Map";
import TrashCard from "./TrashCard";

class MapContainer extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      location_id: null,
      description: "",
      bounty: null,
      trash: [],
      userTrashCoords: [],
      markerKey: null
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
        if (data.userTrashCoords.length > 0) {
          this.setState({
            userTrashCoords: data.userTrashCoords,
            trash: data.trash
          });
        }
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
          userTrashCoords: data.userTrashCoords
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
          userTrashCoords: data.userTrashCoords
        });
      });
  };
  render() {
    return (
      <div>
        <Map
          userTrashCoords={this.state.userTrashCoords}
          markerKeyHolder={this.markerKeyHolder}
        />

        {this.state.trash.length &&
          this.state.trash
            .filter(trash => trash.location_id === this.state.markerKey)
            .map(trash => (
              <TrashCard
                id={trash.id}
                confirmClean={this.confirmClean}
                description={trash.description}
                bounty={trash.bounty}
                cleaned={trash.cleaned}
                reporter_id={trash.reporter_id}
                patchBounty={this.patchBounty}
              />
            ))}
        <div className="text-center">
          <form className="text-center" onSubmit={this.handleTrashSubmit}>
            <button onClick={this.saveLocation}>
              <h3>Snap-Shot Location</h3>
            </button>
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

            <button type="submit">
              {" "}
              <h3>Report Trash </h3>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MapContainer;
