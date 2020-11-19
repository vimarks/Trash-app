import React from "react";
import { Button } from "reactstrap";
import CleanerMap from "./CleanerMap";
import StarRating from "./StarRating";
import CleanTool from "./CleanTool";

class CleanerMapForm extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      trashLocations: [],
      dirtyTrashLocations: [],
      cleanMode: false,
      trash: [],
      markerKey: null,
      users: [],
      reputations: []
    };
  }

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

  setReputations = reps => {
    this.setState({
      reputations: reps
    });
  };

  render() {
    let button, visibleComp;
    if (this.state.markerKey && !this.state.cleanMode) {
      button = (
        <button onClick={() => this.setState({ cleanMode: true })}>
          clean
        </button>
      );
    }

    if (this.state.cleanMode) {
      visibleComp = this.props.allTrash
        .filter(tr => tr.location_id === this.state.markerKey)
        .map(tr => (
          <CleanTool
            currentLocation={this.props.currentLocation}
            cleanTrash={this.props.cleanTrash}
            status={tr.status}
            trash_id={tr.id}
            location_id={tr.location_id}
            dirtyTrashLocations={this.props.dirtyTrashLocations}
            currentLocation={this.props.currentLocation}
          />
        ));
    } else {
      visibleComp = (
        <div className="map">
          <CleanerMap
            coords={this.props.currentLocation}
            dirtyTrashLocations={this.props.dirtyTrashLocations}
            markerKeyHolder={this.markerKeyHolder}
            allTrash={this.props.allTrash}
            users={this.props.users}
            reputations={this.props.reputations}
          />
        </div>
      );
    }
    return (
      <div>
        {visibleComp}
        {button}
      </div>
    );
  }
}

export default CleanerMapForm;
