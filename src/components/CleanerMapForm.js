import React from "react";
import { Button } from "reactstrap";
import CleanerMap from "./CleanerMap";
import CleanerCard from "./CleanerCard";

class CleanerMapForm extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      trashLocations: [],
      trash: [],
      markerKey: null,
      locVerify: false
    };
  }

  componentDidMount() {
    this.initialCFetch();
  }

  initialCFetch = () => {
    fetch("http://localhost:3001/trashes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          trashLocations: data.trashLocations,
          trash: data.trash,
          id: this.state.markerKey
        });
      });
  };

  cleanTrash = id => {
    fetch("http://localhost:3001/trashes/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        cleaner_id: localStorage.getItem("currentUser_id")
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

  markerKeyHolder = loc => {
    if (loc) {
      this.state.markerKey !== loc.id
        ? this.setState({
            markerKey: loc.id,
            locVerify: false
          })
        : this.setState({
            markerKey: null,
            locVerify: false
          });
    }
  };

  compareLocation = () => {
    let cleanerLocation = this.state.trashLocations.filter(
      trLoc => trLoc.id === this.state.markerKey
    );

    let a = cleanerLocation[0].latitude;
    let b = this.props.coords.latitude;
    let latDiff = Math.abs(a - b);

    let x = cleanerLocation[0].longitude;
    let y = this.props.coords.longitude;
    let lonDiff = Math.abs(x - y);

    if (latDiff < 0.00019 && lonDiff < 0.00019) {
      this.setState({
        locVerify: true
      });
    } else {
      this.setState({
        locVerify: false
      });
    }
  };

  render() {
    return (
      <div>
        <CleanerMap
          trashLocations={this.state.trashLocations}
          markerKeyHolder={this.markerKeyHolder}
          trash={this.state.trash}
          cleanTrash={this.cleanTrash}
          locVerify={this.state.locVerify}
          compareLocation={this.compareLocation}
        />
        {this.state.trash
          .filter(tr => tr.location_id === this.state.markerKey)
          .map(tr =>
            tr.cleaned === "dirty" && this.state.locVerify ? (
              <Button onClick={() => this.cleanTrash(tr.id)} color="primary">
                Clean it!
              </Button>
            ) : tr.cleaned === "clean" ? (
              <h2>Awaiting Confirmation</h2>
            ) : (
              <Button onClick={this.compareLocation} className="verify">
                Verify Location
              </Button>
            )
          )}
      </div>
    );
  }
}

export default CleanerMapForm;
