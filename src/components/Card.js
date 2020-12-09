import React from "react";

const Card = props => {
  let [imgObj] = props.images,
    titleImg,
    title,
    bounty;
  titleImg = (
    <h3>
      <img id="titleImgPreview" src={imgObj.url} />
    </h3>
  );
  title = (
    <div>
      <h4>{props.title}</h4>
    </div>
  );
  bounty = (
    <div>
      <h4>${props.bounty}</h4>
    </div>
  );

  return (
    <div className={props.className}>
      {titleImg}
      {title}
      {bounty}

      <div>
        <button onClick={() => props.setCard(props.id, props.className)}>
          {" "}
          select{" "}
        </button>
      </div>
    </div>
  );
};

export default Card;
