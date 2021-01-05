import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const ConfirmTool = props => {
  const token = localStorage.getItem("token");
  const [disabled, setDisabled] = useState(false);

  const areYouSure = () => {
    let x = window.confirm(
      `are you sure? upon confirmation funds will transfer FROM your account in the amount of $${props.bounty}`
    );
    if (x) {
      props.confirmClean(props.trash_id);
      setDisabled(true);
    }
  };

  return (
    <div id="confirm_diplay">
      <figure>
        <img id="confirm_img" src={props.title_url} />
        <figcaption>POSTING</figcaption>
      </figure>
      <figure>
        <img id="confirm_img" src={props.before_url} />
        <figcaption>BEFORE</figcaption>
      </figure>
      <figure>
        <img id="confirm_img" src={props.after_url} />
        <figcaption>AFTER</figcaption>
      </figure>
      <button
        disabled={disabled}
        id="confirm_button"
        onClick={() => areYouSure()}
      >
        Confirm
      </button>
      ;
    </div>
  );
};
export default withRouter(ConfirmTool);
