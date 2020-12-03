import React from "react";
import Card from "./Card";

const MyTrashCard = ({
  myTrashObj,
  allImages,
  allTrash,
  setCard,
  cardSelection
}) => {
  let visibleComp = [],
    images;
  let keys = Object.keys(myTrashObj);
  if (cardSelection !== "all") {
    keys = keys.filter(key => key === cardSelection);
  }
  for (let key of keys) {
    let part = myTrashObj[key].map(tr => {
      images = allImages.filter(img => img.trash_id === tr.id);
      return (
        <Card
          key={tr.id}
          className={key}
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
    visibleComp = visibleComp.concat(part);
  }
  return visibleComp;
};
export default MyTrashCard;
