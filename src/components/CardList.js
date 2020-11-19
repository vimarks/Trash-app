import React, { useState } from "react";
import Card from "./Card.js";
import MyTrashCard from "./MyTrashCard.js";

// can be passed a prop from MyTrash -> Gallery -> CardList -> Card
// that determines which status trashes to display and what color the card should be
// myTrash version should display all trash whose reporter_id or cleaner_id === user_id
const CardList = ({ allTrash, allImages, setCard, type, myTrashObj }) => {
  const [cardSelection, setCardSelection] = useState("all");

  let currentUser_id = Number(localStorage.getItem("currentUser_id"));
  let visibleComp, image, buttonGroup;
  if (type === "cleanGeo") {
    visibleComp = allTrash
      .filter(tr => tr.cleaned === "dirty")
      .map(tr => {
        image = allImages.filter(img => img.trash_id === tr.id);
        return (
          <Card
            key={tr.id}
            setCard={setCard}
            image={image}
            title={tr.title}
            bounty={tr.bounty}
            status={tr.cleaned}
            reporter={tr.reporter_id}
            id={tr.id}
          />
        );
      });
    console.log("visibleComp1", visibleComp);
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
    buttonGroup = (
      <div>
        <button onClick={() => setCardSelection("all")}> all </button>
        <button onClick={() => setCardSelection("clean_success")}>
          {" "}
          clean success{" "}
        </button>
        <button onClick={() => setCardSelection("report_success")}>
          {" "}
          report success{" "}
        </button>
        <button onClick={() => setCardSelection("pending_clean")}>
          {" "}
          pending clean{" "}
        </button>
        <button onClick={() => setCardSelection("pending_your_confirm")}>
          {" "}
          pending your confirm{" "}
        </button>
        <button onClick={() => setCardSelection("pending_their_confirm")}>
          {" "}
          pending their confirm{" "}
        </button>
      </div>
    );
  }
  return (
    <div>
      {visibleComp}
      {buttonGroup}
    </div>
  );
};

export default CardList;
