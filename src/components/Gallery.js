import React, { useState } from "react";
import CardList from "./CardList";
import ClickedCard from "./ClickedCard";

const Gallery = props => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardStatus, setSelectedCardStatus] = useState(null);
  const setCard = (id, cardStatus) => {
    if (!selectedCardId) {
      setSelectedCardId(id);
      setSelectedCardStatus(cardStatus);
    } else {
      setSelectedCardId(null);
      setSelectedCardStatus(null);
    }
  };

  let visibleComp;
  if (selectedCardId) {
    let specificTrash =
      props.allTrash &&
      props.allTrash.filter(trash => trash.id === selectedCardId)[0];
    let images = props.allImages.filter(
      img => img.trash_id === specificTrash.id
    );
    visibleComp = (
      <ClickedCard
        confirmClean={props.confirmClean}
        editFetch={props.editFetch}
        setDisplayMode={props.setDisplayMode}
        from={"gallery"}
        key={specificTrash.id}
        cleanTrash={props.cleanTrash}
        cardStatus={selectedCardStatus}
        setCard={setCard}
        images={images}
        title={specificTrash.title}
        bounty={specificTrash.bounty}
        description={specificTrash.description}
        status={specificTrash.cleaned}
        reporter_id={specificTrash.reporter_id}
        cleaner_id={specificTrash.cleaner_id}
        trash_id={specificTrash.id}
        location_id={specificTrash.location_id}
        dirtyTrashLocations={props.dirtyTrashLocations}
        currentLocation={props.currentLocation}
      />
    );
  } else {
    visibleComp = (
      <CardList
        myTrashObj={props.myTrashObj}
        type={props.type}
        allTrash={props.allTrash}
        allImages={props.allImages}
        setCard={setCard}
      />
    );
  }
  return <div>{visibleComp}</div>;
};
export default Gallery;
