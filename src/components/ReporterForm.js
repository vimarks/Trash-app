import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import "./auth/style.css";

const ReporterForm = props => {
  const [inputFocus, setInputFocus] = useState("");

  const inputFocusSetter = dataHelp => {
    setInputFocus(dataHelp);
    console.log("focus", inputFocus);
  };
  let helpText = inputFocus;
  let image;
  if (props.titleImgLink) {
    image = <img id="titleImgPreview" src={props.titleImgLink} />;
  }

  return (
    <div id="report_form">
      <h1> Report Some Trash </h1>
      <br></br>
      <div id="outer_help">
        <div id="inner_help">{helpText}</div>
      </div>
      <div id="postingTitle">
        <input
          id="postingTitleInput"
          data-help="Here, enter your post's most visible heading, give as much information in as little words possible"
          placeholder="Title"
          type="text"
          name="postingTitle"
          value={props.postingTitle}
          onChange={props.handleChange}
          onMouseEnter={e => setInputFocus(e.target.getAttribute("data-help"))}
          onMouseLeave={e => setInputFocus("")}
          required
        />
      </div>

      <div id="bounty">
        <input
          id="bountyInput"
          data-help="Here, enter the amount you are willing to pay to have your post cleaned (currently denominated in a dummy money called 'kp$')"
          onMouseEnter={e => setInputFocus(e.target.getAttribute("data-help"))}
          onMouseLeave={e => setInputFocus("")}
          placeholder="Bounty"
          type="text"
          name="bounty"
          value={props.bounty}
          onChange={props.handleChange}
          required
        />
      </div>

      <div id="description">
        <textarea
          id="descriptionInput"
          data-help="Here, enter any special instructions for the cleaner (location specifics, expectation of amount cleaned, etc)"
          placeholder="Description"
          type="text"
          name="description"
          value={props.description}
          onChange={props.handleChange}
          onMouseEnter={e => setInputFocus(e.target.getAttribute("data-help"))}
          onMouseLeave={e => setInputFocus("")}
          required
        />
      </div>

      <ImageUpload
        inputFocusSetter={inputFocusSetter}
        onMouseEnter={e => setInputFocus(e)}
        onMouseLeave={e => setInputFocus("")}
        setImgLink={props.setImgLink}
        imageType={"title"}
      />
      {image}
      <div></div>
    </div>
  );
};
export default ReporterForm;
