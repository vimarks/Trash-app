import React from "react";
import { Jumbotron, Button } from "reactstrap";

const CleanerCard = props => {
  return (
    <div>
      <Jumbotron>
        <hr className="my-2" />
        <p className="lead">
          {props.cleaned === "dirty" && props.locVerify ? (
            <Button onClick={() => props.cleanTrash(props.id)} color="primary">
              Clean!
            </Button>
          ) : props.cleaned === "clean" ? (
            "Awaiting Confirmation"
          ) : (
            "Compare Current Location "
          )}
        </p>
      </Jumbotron>
    </div>
  );
};

export default CleanerCard;
