import React from "react";
import { Button } from "reactstrap";
import CleanerMap from "./CleanerMap";
import StarRating from "./StarRating";

class CleanerMapForm extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      trashLocations: [],
      dirtyTrashLocations: [],
      cleanTrashLocations: [],
      confirmedTrashLocations: [],
      trash: [],
      markerKey: null,
      locVerify: null,
      attempts: 0,
      users: [],
      reputations: []
    };
  }

  componentDidMount() {
    this.initialCFetch();
  }

  initialCFetch = () => {
    fetch("http://localhost:3001/trashes/initialCFetch", {
      method: "POST",
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
          confirmedTrashLocations: data.confirmedTrashLocations,
          dirtyTrashLocations: data.dirtyTrashLocations,
          cleanTrashLocations: data.cleanTrashLocations,
          trash: data.trash,
          users: data.users,
          reputations: data.reputations
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

  setReputations = reps => {
    this.setState({
      reputations: reps
    });
  };

  render() {
    return (
      <div>
        <div className="map">
          <CleanerMap
            coords={this.props.coords}
            dirtyTrashLocations={this.state.dirtyTrashLocations}
            cleanTrashLocations={this.state.cleanTrashLocations}
            confirmedTrashLocations={this.state.confirmedTrashLocations}
            markerKeyHolder={this.markerKeyHolder}
            trash={this.state.trash}
            cleanTrash={this.cleanTrash}
            locVerify={this.state.locVerify}
            compareLocation={this.compareLocation}
            users={this.state.users}
            reputations={this.state.reputations}
          />
        </div>
        <div>
          {this.state.trash
            .filter(tr => tr.location_id === this.state.markerKey)
            .map(tr =>
              this.state.reputations.filter(rep => rep.trash_id === tr.id)
                .length === 0 && tr.cleaned == "clean" ? (
                <div className="starGroup">
                  <h2 className="verify"> Awaiting Confirmation... </h2>
                  <StarRating
                    setReputations={this.setReputations}
                    reporter_id={tr.reporter_id}
                    trash_id={tr.id}
                  />
                </div>
              ) : this.state.reputations.filter(rep => rep.trash_id === tr.id)
                  .length === 0 && tr.cleaned == "confirmed" ? (
                <div className="starGroup">
                  <StarRating
                    setReputations={this.setReputations}
                    reporter_id={tr.reporter_id}
                    trash_id={tr.id}
                  />
                </div>
              ) : this.state.reputations.filter(rep => rep.trash_id === tr.id)
                  .length > 0 && tr.cleaned == "confirmed" ? (
                <h2 className="verify"> all done! </h2>
              ) : this.state.reputations.filter(rep => rep.trash_id === tr.id)
                  .length > 0 && tr.cleaned == "clean" ? (
                <h2 className="verify"> Awaiting Confirmation... </h2>
              ) : tr.cleaned === "dirty" &&
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
                <div className="starGroup">
                  <StarRating
                    setReputations={this.setReputations}
                    reporter_id={tr.reporter_id}
                    trash_id={tr.id}
                  />
                </div>
              )
            )}
        </div>
      </div>
    );
  }
}

export default CleanerMapForm;
