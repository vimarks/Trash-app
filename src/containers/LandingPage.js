import React from "react";
import "../App.css";
import Login from "../components/auth/Login";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="bg">
        <Login />
      </div>
    );
  }
}

export default LandingPage;

// <div>
//   <h3>Trash-App</h3>
//   <ul className="nav-links">
//     <Link to="/login">
//       <li>Login</li>
//     </Link>
//     <Link to="/register">
//       <li>Register</li>
//     </Link>
//   </ul>
// </div>;
