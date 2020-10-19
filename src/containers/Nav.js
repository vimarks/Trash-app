import React from "react";
import "../components/auth/style.css";
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
    if (this.token) {
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
  }

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser_id");
    localStorage.removeItem("currentUser_username");
    this.props.setAuth();
    this.props.history.push("/login");
  };

  render() {
    return (
      <nav>
        <ul className="nav-links">
          <li className="logo">
            <h1>
              trash<span>app</span>
            </h1>
          </li>
          <Link to="/report">
            <li>Report</li>
          </Link>

          <Link to="/clean">
            <li>Clean</li>
          </Link>

          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to="/wallet">
            <li>Wallet</li>
          </Link>

          <Link to="/trophy">
            <li>Trophy Room</li>
          </Link>

          <Link onClick={this.logout} to="/login">
            <li>Logout</li>
          </Link>
          <li>
            <h3>
              Welcome <em>{localStorage.getItem("currentUser_username")}</em>!
            </h3>
            {this.state.userWallet && this.state.userWallet.balance} kP$
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
