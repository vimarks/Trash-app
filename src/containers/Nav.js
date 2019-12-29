import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser_id");
    this.props.setAuth();
    this.props.history.push("/login");
  };

  render() {
    console.log(this.props);
    const navStyle = {
      color: "black"
    };
    return (
      <nav>
        <h3>Trash-App</h3>
        <ul className="nav-links">
          <Link style={navStyle} to="/clean">
            <li>Clean</li>
          </Link>
          <Link style={navStyle} to="/report">
            <li>Report</li>
          </Link>
          <Link style={navStyle} to="/wallet">
            <li>Wallet</li>
          </Link>
          <Link onClick={this.logout} style={navStyle} to="/login">
            <li>Logout</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
