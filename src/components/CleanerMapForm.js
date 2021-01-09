import React from "react";
import { Button } from "reactstrap";
import Map from "./Map";
import StarRating from "./StarRating";
import ClickedCard from "./ClickedCard";

class CleanerMapForm extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      displayMode: "map",
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
    this.state.markerKey !== id
      ? this.setState({
          markerKey: id
        })
      : this.setState({
          markerKey: null
        });
  };
  setDisplayMode = mode => {
    this.setState({ displayMode: mode });
  };

  setReputations = reps => {
    this.setState({
      reputations: reps
    });
  };

  render() {
    let visibleComp;
    if (this.state.displayMode === "clickedCard") {
      let clickedTrash = this.props.allTrash.filter(
        trash => trash.location_id === this.state.markerKey
      )[0];
      let images = this.props.allImages.filter(
        img => img.trash_id === clickedTrash.id
      );
      visibleComp = (
        <ClickedCard
          editFetch={this.props.editFetch}
          markerKeyHolder={this.markerKeyHolder}
          setDisplayMode={this.setDisplayMode}
          from={"map"}
          key={clickedTrash.id}
          cleanTrash={this.props.cleanTrash}
          cardStatus={"pending_clean"}
          images={images}
          title={clickedTrash.title}
          bounty={clickedTrash.bounty}
          description={clickedTrash.description}
          reporter_id={clickedTrash.reporter_id}
          trash_id={clickedTrash.id}
          location_id={clickedTrash.location_id}
          status={clickedTrash.cleaned}
          created_at={clickedTrash.created_at}
          dirtyTrashLocations={this.props.dirtyTrashLocations}
        />
      );
    } else {
      visibleComp = (
        <div className="map">
          <Map
            fromCleanerSide={true}
            dirtyTrashLocations={this.props.dirtyTrashLocations}
            markerKeyHolder={this.markerKeyHolder}
            allTrash={this.props.allTrash}
            users={this.props.users}
            reputations={this.props.reputations}
            setDisplayMode={this.setDisplayMode}
          />
        </div>
      );
    }
    return <div>{visibleComp}</div>;
  }
}

export default CleanerMapForm;
