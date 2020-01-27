import React from "react";
import { Button } from "reactstrap";
import CleanerMap from "./CleanerMap";

class CleanerMapForm extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      trashLocations: [],
      dirtyTrashLocations: [],
      cleanTrashLocations: [],
      trash: [],
      markerKey: null,
      locVerify: null,
      attempts: 0
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
          dirtyTrashLocations: data.dirtyTrashLocations,
          cleanTrashLocations: data.cleanTrashLocations,
          trash: data.trash,
          id: this.state.markerKey
        });
      });
  };

  cleanTrash = id => {
    console.log(id);
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
          trash: data.allTrash,
          dirtyTrashLocations: data.dirtyTrashLocations,
          cleanTrashLocations: data.cleanTrashLocations
        });
      });
  };

  markerKeyHolder = id => {
    if (id) {
      this.state.markerKey !== id
        ? this.setState({
            markerKey: id,
            locVerify: false,
            attempts: 0
          })
        : this.setState({
            markerKey: null,
            locVerify: false,
            attempts: 0
          });
    }
  };

  compareLocation = () => {
    let cleanerLocation = this.state.dirtyTrashLocations.filter(
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
        locVerify: false,
        attempts: this.state.attempts + 1
      });
    }
  };

  render() {
    return (
      <div>
        <CleanerMap
          dirtyTrashLocations={this.state.dirtyTrashLocations}
          cleanTrashLocations={this.state.cleanTrashLocations}
          markerKeyHolder={this.markerKeyHolder}
          trash={this.state.trash}
          cleanTrash={this.cleanTrash}
          locVerify={this.state.locVerify}
          compareLocation={this.compareLocation}
        />
        <div>
          {this.state.trash
            .filter(tr => tr.location_id === this.state.markerKey)
            .map(tr =>
              tr.cleaned === "dirty" &&
              this.state.locVerify === false &&
              this.state.attempts % 2 === 0 ? (
                <Button className="verify" onClick={this.compareLocation}>
                  Verify Location
                </Button>
              ) : tr.cleaned === "dirty" && this.state.locVerify === true ? (
                <Button
                  className="verify"
                  onClick={() => this.cleanTrash(tr.id)}
                  color="primary"
                >
                  Clean it!
                </Button>
              ) : tr.cleaned === "dirty" &&
                this.state.locVerify === false &&
                this.state.attempts % 2 !== 0 ? (
                <h2 className="verify"> Incorrect Location </h2>
              ) : (
                <h2 className="verify"> Awaiting Confirmation </h2>
              )
            )}
        </div>
      </div>
    );
  }
}

export default CleanerMapForm;
