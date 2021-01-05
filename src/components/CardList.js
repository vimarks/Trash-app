import React, { useState } from "react";
import Card from "./Card.js";
import MyTrashCard from "./MyTrashCard.js";

// can be passed a prop from MyTrash -> Gallery -> CardList -> Card
// that determines which status trashes to display and what color the card should be
// myTrash version should display all trash whose reporter_id or cleaner_id === user_id
const CardList = ({ allTrash, allImages, setCard, type, myTrashObj }) => {
  const [cardSelection, setCardSelection] = useState("all");
  console.log("CARD SELECTION", cardSelection);
  let currentUser_id = Number(localStorage.getItem("currentUser_id"));
  let visibleComp, images, statButtons;
  if (type === "cleanGeo") {
    visibleComp =
      allTrash &&
      allTrash
        .filter(tr => tr.cleaned === "dirty")
        .map(tr => {
          images = allImages.filter(img => img.trash_id === tr.id);
          return (
            <Card
              className={"pending_clean"}
              key={tr.id}
              setCard={setCard}
              images={images}
              title={tr.title}
              bounty={tr.bounty}
              status={tr.cleaned}
              reporter={tr.reporter_id}
              id={tr.id}
            />
          );
        });
  } else {
    visibleComp = (
      <MyTrashCard
        cardSelection={cardSelection}
        myTrashObj={myTrashObj}
        allImages={allImages}
        allTrash={allTrash}
        setCard={setCard}
      />
    );
    let statuses = [
      "all",
      "clean_success",
      "report_success",
      "pending_clean",
      "pending_your_confirm",
      "pending_their_confirm"
    ];
    statButtons = statuses.map(status => {
      return (
        <button
          id={status + "_button"}
          onClick={() => setCardSelection(status)}
        >
          {" "}
          {status}{" "}
        </button>
      );
    });
  }
  return (
    <div>
      <div id="buttonGroup">{statButtons}</div>
      <div className="flex_container">{visibleComp}</div>
    </div>
  );
};

export default CardList;
