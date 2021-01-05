import React, { useState } from "react";
import CleanTool from "./CleanTool.js";
import ConfirmTool from "./ConfirmTool.js";
import EditTool from "./EditTool.js";
import timeSince from "./timeSince.js";

// will use props.status to determine which tool button to display
// button will then setCleanMode, or setEditMode, or setConfirmMode
const ClickedCard = props => {
  const [locVerify, setLocVerify] = useState(false);
  const [cleanMode, setCleanMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmMode, setConfirmMode] = useState(false);

  const currentUser_id = Number(localStorage.getItem("currentUser_id"));
  let visibleComp,
    center_bottom,
    left_top,
    right_top,
    left_mid,
    right_mid,
    date;
  let before_url, after_url, title_url;
  for (let image of props.images) {
    if (image.image_type === "before") before_url = image.url;
    else if (image.image_type === "after") after_url = image.url;
    else title_url = image.url;
  }

  let dateObj = new Date(props.created_at);
  let timeSinceCreation = timeSince(dateObj);

  if (props.from === "gallery") {
    left_top = (
      <button onClick={() => props.setCard(props.id)}> see gallery </button>
    );
  } else {
    left_top = (
      <button
        onClick={() => {
          props.setDisplayMode("map");
          props.markerKeyHolder(null);
        }}
      >
        {" "}
        see map{" "}
      </button>
    );
  }
  if (cleanMode) {
    visibleComp = (
      <div>
        <button id="back_to_card" onClick={() => setCleanMode(false)}>
          {" "}
          back to card{" "}
        </button>
        <CleanTool
          cleanTrash={props.cleanTrash}
          status={props.status}
          trash_id={props.trash_id}
          location_id={props.location_id}
          dirtyTrashLocations={props.dirtyTrashLocations}
          currentLocation={props.currentLocation}
        />
      </div>
    );
  } else if (confirmMode) {
    visibleComp = (
      <div>
        <button id="back_to_card" onClick={() => props.setCard(props.id)}>
          {" "}
          see gallery{" "}
        </button>
        <ConfirmTool
          title_url={title_url}
          before_url={before_url}
          after_url={after_url}
          trash_id={props.trash_id}
          confirmClean={props.confirmClean}
          bounty={props.bounty}
        />
      </div>
    );
  } else if (editMode) {
    visibleComp = (
      <div>
        <button id="back_to_card" onClick={() => setEditMode(false)}>
          {" "}
          back to card{" "}
        </button>
        <EditTool
          trash_id={props.trash_id}
          editFetch={props.editFetch}
          setDisplayMode={props.setDisplayMode}
        />
      </div>
    );
  } else {
    if (props.cardStatus === "pending_clean") {
      if (currentUser_id !== props.reporter_id) {
        center_bottom = (
          <button onClick={() => setCleanMode(true)}> clean mode </button>
        );
      } else {
        center_bottom = (
          <button onClick={() => setEditMode(true)}> edit mode </button>
        );
      }
      left_mid = (
        <figure id="left_mid">
          <img id="left_mid" src={title_url} />
          <figcaption>BEFORE</figcaption>
        </figure>
      );
      right_mid = (
        <div id="right_mid_description">
          <ul style={{ marginLeft: "-10px" }}>
            <li>
              <span style={{ "font-size": "19pt" }}>STATUS:</span>{" "}
              {props.cardStatus}
            </li>
            <li>
              <span style={{ "font-size": "19pt" }}>BOUNTY:</span> $
              {props.bounty}
            </li>
          </ul>
          <div style={{ "line-height": "1", "margin-left": "30px" }}>
            <p>
              <span style={{ "font-size": "19pt" }}>DESCRIPTION:</span>{" "}
              {props.description}
            </p>
            <br></br>
            <span style={{ "font-size": "15pt" }}>
              <span style={{ "font-size": "19pt" }}>Posted:</span>{" "}
              {timeSinceCreation}
            </span>
          </div>
        </div>
      );
    } else {
      left_mid = (
        <figure id="left_mid">
          <img id="left_mid" src={before_url} />
          <figcaption>BEFORE</figcaption>
        </figure>
      );
      right_mid = (
        <figure id="right_mid_after">
          <img id="right_mid_after" src={after_url} />
          <figcaption>AFTER</figcaption>
        </figure>
      );
    }
    if (props.cardStatus === "pending_your_confirm") {
      center_bottom = (
        <button onClick={() => setConfirmMode(true)}> confirm mode </button>
      );
    }

    visibleComp = (
      <div
        id="clicked_card"
        className={props.cardStatus}
        style={{ width: "95%" }}
      >
        <div id="left_top">{left_top}</div>
        <div id="center_top">{props.title}</div>
        <div id="right_top">${props.bounty}</div>
        {left_mid}
        {right_mid}
        <div id="center_bottom">{center_bottom}</div>
      </div>
    );
  }

  return visibleComp;
};

export default ClickedCard;
