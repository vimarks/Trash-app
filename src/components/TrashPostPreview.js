import React, { Component } from "react";

const TrashPostPreview = props => {
  return (
    <div>
      title {props.postingTitle}
      description {props.description}
      bounty {props.bounty}
      <img id="titleImgPreview" src={props.titleImgLink} />
    </div>
  );
};

export default TrashPostPreview;
