import React from "react";

const ConfirmTool = props => {
  const token = localStorage.getItem("token");

  const confirmClean = id => {
    fetch("http://localhost:3001/trashes/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        reporter_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {});
  };

  const areYouSure = () => {
    let x = window.confirm(
      "are you sure? upon confirmation funds will transfer from your account in the amount of the cleaned trash instance"
    );
    if (x) confirmClean(props.trash_id);
  };

  return <button onClick={() => areYouSure()}>Confirm</button>;
};
export default ConfirmTool;
