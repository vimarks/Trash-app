import React, { useState } from "react";
import CleanTool from "./CleanTool.js";
import ConfirmTool from "./ConfirmTool.js";
import EditTool from "./EditTool.js";

// will use props.status to determine which tool button to display
// button will then setCleanMode, or setEditMode, or setConfirmMode
const ClickedCard = props => {
  console.log(typeof localStorage.getItem("currentUser_id"));
  const [locVerify, setLocVerify] = useState(false);
  const [cleanMode, setCleanMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmMode, setConfirmMode] = useState(false);

  const currentUser_id = Number(localStorage.getItem("currentUser_id"));

  let visibleComp, button;
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
        <button onClick={() => setCleanMode(false)}> back to card </button>
      </div>
    );
  } else if (confirmMode) {
    visibleComp = (
      <div>
        <ConfirmTool trash_id={props.trash_id} />
        <button onClick={() => setConfirmMode(false)}> back to card </button>
      </div>
    );
  } else if (editMode) {
    visibleComp = (
      <div>
        <EditTool trash_id={props.trash_id} />
        <button onClick={() => setEditMode(false)}> back to card </button>
      </div>
    );
  } else {
    if (props.status === "dirty" && props.reporter_id !== currentUser_id) {
      button = <button onClick={() => setCleanMode(true)}> clean mode </button>;
    }
    if (props.status === "clean" && props.cleaner_id !== currentUser_id) {
      button = (
        <button onClick={() => setConfirmMode(true)}> confirm mode </button>
      );
    }
    visibleComp = (
      <div className="trashCard">
        {props.title}
        {props.id}
        <img id="titleImgPreview" src={props.image[0] && props.image[0].url} />
        {button}
        <button onClick={() => props.setCard(props.id)}>
          {" "}
          back to gallery{" "}
        </button>
      </div>
    );
  }

  return visibleComp;
};

export default ClickedCard;
