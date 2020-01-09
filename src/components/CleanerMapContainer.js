import React from "react";
import CleanerMap from "./CleanerMap";
import CleanerCard from "./CleanerCard";

class CleanerMapContainer extends React.Component {
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

  markerKeyHolder = id => {
    this.state.markerKey !== id
      ? this.setState({
          markerKey: id,
          locVerify: false
        })
      : this.setState({
          markerKey: null,
          locVerify: false
        });
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
      console.log(this.state.locVerify);
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
        />

        {this.state.trash.length > 0 &&
          this.state.trash
            .filter(trash => trash.location_id === this.state.markerKey)
            .map(trash => (
              <CleanerCard
                cleanTrash={this.cleanTrash}
                id={trash.id}
                description={trash.description}
                bounty={trash.bounty}
                cleaned={trash.cleaned}
                reporter_id={trash.reporter_id}
                locVerify={this.state.locVerify}
              />
            ))}

        <button onClick={this.compareLocation}>
          <h3> Compare Location </h3>
        </button>
      </div>
    );
  }
}

export default CleanerMapContainer;
