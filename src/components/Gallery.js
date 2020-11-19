import React, { useState } from "react";
import CardList from "./CardList";
import ClickedCard from "./ClickedCard";

const Gallery = props => {
  const [selectedCardId, setSelectedCardId] = useState(null);

  const setCard = id => {
    if (!selectedCardId) setSelectedCardId(id);
    else setSelectedCardId(null);
  };

  let visibleComp;
  if (selectedCardId) {
    let specificTrash =
      props.allTrash &&
      props.allTrash.filter(trash => trash.id === selectedCardId)[0];
    let image = props.allImages.filter(
      img => img.trash_id === specificTrash.id
    );
    visibleComp = (
      <ClickedCard
        key={specificTrash.id}
        cleanTrash={props.cleanTrash}
        setCard={setCard}
        image={image}
        title={specificTrash.title}
        bounty={specificTrash.bounty}
        description={specificTrash.description}
        status={specificTrash.cleaned}
        reporter_id={specificTrash.reporter_id}
        cleaner_id={specificTrash.cleaner_id}
        trash_id={specificTrash.id}
        location_id={specificTrash.location_id}
        dirtyTrashLocations={props.dirtyTrashLocations}
        clean_success={props.clean_success}
        pending_their_confirm={props.pending_their_confirm}
        report_success={props.report_success}
        pending_clean={props.pending_clean}
        pending_your_confirm={props.pending_your_confirm}
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
