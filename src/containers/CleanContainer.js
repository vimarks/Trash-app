import React from "react";
import "../App.css";
import CleanerMapContainer from "../components/CleanerMapContainer";
import Nav from "./Nav";

class CleanContainer extends React.Component {
  render() {
    return (
      <div>
        <CleanerMapContainer />
      </div>
    );
  }
}

export default CleanContainer;
