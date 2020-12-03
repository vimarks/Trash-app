import React, { useState } from "react";
import CleanTool from "./CleanTool.js";
import ConfirmTool from "./ConfirmTool.js";
import EditTool from "./EditTool.js";

// will use props.status to determine which tool button to display
// button will then setCleanMode, or setEditMode, or setConfirmMode
const ClickedCard = props => {
  const [locVerify, setLocVerify] = useState(false);
  const [cleanMode, setCleanMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmMode, setConfirmMode] = useState(false);

  const currentUser_id = Number(localStorage.getItem("currentUser_id"));
  let visibleComp, center_bottom, left_top, right_top, left_mid, right_mid;
  let [title, before, after] = props.images;
  if (props.from === "gallery") {
    left_top = (
      <button onClick={() => props.setCard(props.id)}> back to gallery </button>
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
        back to map{" "}
      </button>
    );
  }
  if (cleanMode) {
    visibleComp = (
      <div>
        <CleanTool
          cleanTrash={props.cleanTrash}
          status={props.status}
          trash_id={props.trash_id}
          location_id={props.location_id}
          dirtyTrashLocations={props.dirtyTrashLocations}
          currentLocation={props.currentLocation}
        />
        <button onClick={() => props.setCard(props.id)}>
          {" "}
          back to gallery{" "}
        </button>
      </div>
    );
  } else if (confirmMode) {
    visibleComp = (
      <div>
        <ConfirmTool
          trash_id={props.trash_id}
          confirmClean={props.confirmClean}
        />
        <button onClick={() => props.setCard(props.id)}>
          {" "}
          back to gallery{" "}
        </button>
      </div>
    );
  } else if (editMode) {
    visibleComp = (
      <div>
        <EditTool
          trash_id={props.trash_id}
          editFetch={props.editFetch}
          setDisplayMode={props.setDisplayMode}
        />
        <button onClick={() => setEditMode(false)}> back to card </button>
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
      left_mid = <img id="left_mid" src={title.url} />;
      right_mid = (
        <div id="right_mid_description">
          <p> {props.description} </p>
        </div>
      );
    } else {
      left_mid = (
        <figure id="left_mid">
          <img id="left_mid" src={before.url} />
          <figcaption>BEFORE</figcaption>
        </figure>
      );
      right_mid = (
        <figure id="right_mid_after">
          <img id="left_mid" src={after.url} />
          <figurecaption>AFTER</figurecaption>
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
        style={{ width: "100%" }}
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
