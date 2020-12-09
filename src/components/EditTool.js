import React, { useState } from "react";
import MyTrash from "./MyTrash.js";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class EditTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneBox: false,
      titleBox: false,
      bountyBox: false,
      descriptionBox: false,
      title: "",
      bounty: "",
      description: ""
    };
  }
  token = localStorage.getItem("token");

  checkboxManager = field => {
    this.setState({ [field]: !this.state[field] });
  };

  inputManager = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  redirectClean = () => {
    this.setState({ doneBox: true });
    // this.props.history.push("/clean");
  };

  buildBody = () => {
    let body = Object.create(null);
    Object.keys(this.state)
      .filter(key => key.slice(key.length - 3, key.length) !== "Box")
      .map(key => {
        if (this.state[key]) {
          return (body[key] = this.state[key]);
        }
      });
    return body;
  };

  render() {
    let checkboxes, titleInput, bountyInput, descriptionInput, visible;
    let { titleBox, bountyBox, descriptionBox } = this.state;
    if (titleBox)
      titleInput = (
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={e => this.inputManager(e)}
          placeholder="enter new title"
        />
      );
    if (bountyBox)
      bountyInput = (
        <input
          type="number"
          name="bounty"
          value={this.state.bounty}
          onChange={e => this.inputManager(e)}
          placeholder="enter new bounty"
        />
      );
    if (descriptionBox)
      descriptionInput = (
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={e => this.inputManager(e)}
          placeholder="enter new description"
        />
      );
    if (!this.state.doneBox) {
      visible = (
        <button
          onClick={() => {
            this.props.editFetch(this.buildBody(), this.props.trash_id);
            this.redirectClean();
          }}
        >
          {" "}
          Submit{" "}
        </button>
      );
    } else {
    }
    checkboxes = (
      <div id="edit_div">
        <h1> Edit Your Post </h1>
        <div id="title">
          <label id="reportLabel">Title </label>
          <input
            id="titleInput"
            type="checkbox"
            name="titleBox"
            onChange={e => this.checkboxManager(e.target.name)}
          />
          {titleInput}
        </div>

        <div id="bounty">
          <label id="bountyLabel">Bounty </label>
          <input
            id="bountyInput"
            type="checkbox"
            name="bountyBox"
            onChange={e => this.checkboxManager(e.target.name)}
          />
          {bountyInput}
        </div>

        <div id="description">
          <label id="descriptionLabel">Description </label>
          <input
            id="descriptionInput"
            type="checkbox"
            name="descriptionBox"
            onChange={e => this.checkboxManager(e.target.name)}
          />
          {descriptionInput}
        </div>
        {visible}
      </div>
    );

    return <div>{checkboxes}</div>;
  }
}
export default withRouter(EditTool);
