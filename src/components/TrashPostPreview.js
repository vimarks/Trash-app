import React, { Component } from "react";

const TrashPostPreview = props => {
  return (
    <div id="preview_div">
      <ul>
        <li>TITLE: {props.postingTitle}</li>
        <li>DESCRIPTION: {props.description}</li>
        <li>BOUNTY: ${props.bounty}</li>
      </ul>
      <img id="preview_image" src={props.titleImgLink} />
    </div>
  );
};

export default TrashPostPreview;
