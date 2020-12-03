import React from "react";

const ConfirmTool = props => {
  const token = localStorage.getItem("token");

  const areYouSure = () => {
    let x = window.confirm(
      "are you sure? upon confirmation funds will transfer from your account in the amount of the cleaned trash instance"
    );
    if (x) props.confirmClean(props.trash_id);
  };

  return <button onClick={() => areYouSure()}>Confirm</button>;
};
export default ConfirmTool;
