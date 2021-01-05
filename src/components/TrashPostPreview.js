import React, { Component } from "react";

const TrashPostPreview = props => {
  return (
    <div id="preview_div">
      <div id="preview_heading">
        {" "}
        <h1>Posting Preview</h1>{" "}
      </div>
      <br></br>
      <ul>
        <li>
          <b>TITLE:</b> {props.postingTitle}
        </li>
        <li>
          <b>DESCRIPTION:</b> {props.description}
        </li>
        <li>
          <b>BOUNTY:</b> ${props.bounty}
        </li>
      </ul>
      <div>
        <img id="preview_image" src={props.titleImgLink} />
      </div>
    </div>
  );
};

export default TrashPostPreview;
