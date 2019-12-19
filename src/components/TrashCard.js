import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const TrashCard = (props) => {
  return (
    <div>
      <Jumbotron >
        <h1 className="display-3">${props.bounty}</h1>
        <p className="lead">{props.description}</p>
        <hr className="my-2" />

        <p className="lead">
          {props.cleaned === "clean"?
          <Button onClick={() => props.confirmClean(props.id)} color="primary">
            confirm trash pickup
          </Button>: <Button> Lower Bounty </Button>
         }


        </p>
      </Jumbotron>
    </div>
  );
};

export default TrashCard;
