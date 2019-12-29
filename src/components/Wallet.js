import React from "react";
import { Jumbotron, Button } from "reactstrap";

class Wallet extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      userWallet: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/wallets/getUserWallet", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          userWallet: data.wallet[0]
        });
      });
  }
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">${this.state.userWallet.balance}</h1>
          <p className="lead"></p>
          <hr className="my-2" />

          <p className="lead">
            <Button color="primary">Add to balance</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Wallet;
