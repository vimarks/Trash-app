import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="bg">
        <Container>
          <Row>
            <Col className="text-center">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <h1> Trash-App</h1>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Row>
            <Col className="text-center" xs="6">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </Col>
            <Col className="text-center" xs="6">
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </Col>
          </Row>
        </Container>
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
