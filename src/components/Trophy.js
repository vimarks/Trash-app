import React from "react";
import "./auth/style.css";

class Trophy extends React.Component {
  render() {
    return (
      <div className="col s12 m7" style={{ maxWidth: "10%", maxHeight: "20%" }}>
        <div className="card-image" style={{ maxWidth: "100%" }}>
          <img src="https://i.pinimg.com/236x/cf/9d/52/cf9d52b8d89aac9e52d076fcff5ff7a6--painted-trash-cans-painted-pots.jpg" />
        </div>
        <ul>
          <li>
            {this.props.bounty}
            <small> kP$</small>{" "}
          </li>
          <li>{this.props.description} </li>
        </ul>
      </div>
    );
  }
}

export default Trophy;
