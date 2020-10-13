import React from "react";
import { Jumbotron } from "reactstrap";

class Wallet extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      userWallet: []
    };
  }

  componentDidMount() {
    fetch("https://localhost:3001/wallets/getUserWallet", {
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
      <div className="bg1">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Jumbotron classname>
          <h2>
            {this.state.userWallet.balance}
            <small> kP$</small>
          </h2>

          <p className="lead"></p>
          <hr className="my-2" />
        </Jumbotron>
      </div>
    );
  }
}

export default Wallet;
