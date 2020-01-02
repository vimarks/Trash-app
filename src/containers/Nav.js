import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
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

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser_id");
    localStorage.removeItem("currentUser_username");
    this.props.setAuth();
    this.props.history.push("/login");
  };

  render() {
    const navStyle = {
      color: "black"
    };
    return (
      <nav>
        <br></br>
        <br></br>
        <ul className="nav-links">
          <Link style={navStyle} to="/report">
            <li>Report</li>
          </Link>
          <Link style={navStyle} to="/clean">
            <li>Clean</li>
          </Link>
          <Link style={navStyle} to="/wallet">
            <li>Wallet</li>
          </Link>
          <Link style={navStyle} to="/trophy">
            <li>Trophy-Room</li>
          </Link>
          <Link onClick={this.logout} style={navStyle} to="/login">
            <li>Logout</li>
          </Link>
          <li style={navStyle}>
            <h3>Welcome {localStorage.getItem("currentUser_username")}!</h3>
            {this.state.userWallet.balance} kP$
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
