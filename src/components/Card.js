import React from "react";
// props.status will determine the color of the card
const Card = props => {
  return (
    <div className={props.className}>
      <p>
        reporter_id{props.reporter}
        {props.title}
        {props.id}
        {props.status}
      </p>
      <img id="titleImgPreview" src={props.image[0] && props.image[0].url} />
      <button onClick={() => props.setCard(props.id)}> select </button>
    </div>
  );
};

export default Card;
