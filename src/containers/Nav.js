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

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser_id");
    localStorage.removeItem("currentUser_username");
    this.props.setAuth();
    // this.props.history.push("/");
  };

  render() {
    return (
      <nav>
        <ul className="nav-links">
          <li id="logo_in_app">
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

          <Link to="/mytrash">
            <li>MyTrash</li>
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
            {this.props.userWallet && this.props.userWallet.balance} kP$
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
