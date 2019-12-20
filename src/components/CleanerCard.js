import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const CleanerCard = (props) => {
  return (
    <div>
      <Jumbotron >
        <h1 className="display-3">${props.bounty}</h1>
        <p className="lead">{props.description}</p>
        <hr className="my-2" />

        <p className="lead">
          {props.cleaned === "dirty"? <Button onClick={() => props.cleanTrash(props.id)} color="primary">
            Clean!
          </Button>
          : "Awaiting Confirmation"}
        </p>
      </Jumbotron>
    </div>
  );
};

export default CleanerCard;
