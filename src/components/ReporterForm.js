import React from "react";
import ImageUpload from "./ImageUpload";
import "./auth/style.css";

const ReporterForm = props => {
  let image;
  if (props.titleImgLink) {
    image = <img id="titleImgPreview" src={props.titleImgLink} />;
  }
  return (
    <div id="reportDiv">
      <div id="postingTitle">
        <label id="reportLabel">Posting Title</label>
        <input
          id="postingTitleInput"
          type="text"
          name="postingTitle"
          value={props.postingTitle}
          onChange={props.handleChange}
          required
        />
      </div>

      <div id="bounty">
        <label id="bountyLabel">Bounty</label>
        <input
          id="bountyInput"
          type="text"
          name="bounty"
          value={props.bounty}
          onChange={props.handleChange}
          required
        />
      </div>

      <div id="description">
        <label id="descriptionLabel">Description</label>
        <input
          id="descriptionInput"
          type="text"
          name="description"
          value={props.description}
          onChange={props.handleChange}
          required
        />
      </div>

      <div>
        <ImageUpload setImgLink={props.setImgLink} imageType={"title"} />
        {image}
      </div>
    </div>
  );
};
export default ReporterForm;
