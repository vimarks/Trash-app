import React, { useState } from "react";
import { Jumbotron, Button } from "reactstrap";

const TrashCard = props => {
  const [newBounty, setBounty] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    props.patchBounty(newBounty);
  };

  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">${props.bounty}</h1>
        <p className="lead">{props.description}</p>
        <hr className="my-2" />

        <p className="lead">
          {props.cleaned === "clean" ? (
            <Button
              onClick={() => props.confirmClean(props.id)}
              color="primary"
            >
              confirm trash pickup
            </Button>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="reset bounty"
                value={newBounty}
                onChange={e => setBounty(e.target.value)}
              />
              <input type="submit" value="Change Bounty" />
            </form>
          )}
        </p>
      </Jumbotron>
    </div>
  );
};

export default TrashCard;
