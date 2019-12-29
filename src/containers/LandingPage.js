import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <h3>Trash-App</h3>
        <ul className="nav-links">
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/register">
            <li>Register</li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default LandingPage;
