import React from "react";
import ImageUpload from "./ImageUpload";
import "./auth/style.css";

const ReporterForm = props => {
  let image;
  if (props.titleImgLink) {
    image = <img id="titleImgPreview" src={props.titleImgLink} />;
  }
  return (
    <div id="report_form">
      <h1> Post Some Trash </h1>
      <div id="postingTitle">
        <input
          id="postingTitleInput"
          placeholder="Title"
          type="text"
          name="postingTitle"
          value={props.postingTitle}
          onChange={props.handleChange}
          required
        />
      </div>

      <div id="bounty">
        <input
          id="bountyInput"
          placeholder="Bounty"
          type="text"
          name="bounty"
          value={props.bounty}
          onChange={props.handleChange}
          required
        />
      </div>

      <div id="description">
        <input
          id="descriptionInput"
          placeholder="Description"
          type="text"
          name="description"
          value={props.description}
          onChange={props.handleChange}
          required
        />
      </div>

      <ImageUpload setImgLink={props.setImgLink} imageType={"title"} />
      {image}
      <div></div>
    </div>
  );
};
export default ReporterForm;
