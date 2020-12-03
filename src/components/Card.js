import React from "react";

const Card = props => {
  let [imgObj] = props.images,
    titleImg,
    title,
    bounty;
  titleImg = <img id="titleImgPreview" src={imgObj.url} />;
  title = <div>{props.title}</div>;
  bounty = <div>{props.bounty}</div>;

  return (
    <div className={props.className}>
      {titleImg}
      {title}${bounty}
      <button onClick={() => props.setCard(props.id, props.className)}>
        {" "}
        select{" "}
      </button>
    </div>
  );
};

export default Card;
