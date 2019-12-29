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
      userTrash: [],
      markerKey: null
    };
  }

  componentDidMount() {
    this.initialRFetch();
  }

  initialRFetch = () => {
    fetch("http://localhost:3001/trashes/getUserTrash", {
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
        if (data.userTrash.length > 0) {
          this.setState({
            userTrash: data.userTrash,
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
          userTrash: data.userTrash
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
    !this.state.markerKey
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
          userTrash: data.userTrash
        });
      });
  };
  render() {
    return (
      <div>
        <Map
          userTrash={this.state.userTrash}
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

        <button onClick={this.saveLocation}>
          <h3> Mark Location </h3>
        </button>
        <form onSubmit={this.handleTrashSubmit}>
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

          <button type="submit"> Report Trash </button>
        </form>
      </div>
    );
  }
}

export default MapContainer;
