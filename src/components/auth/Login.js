import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Form,
  Input,
  Container,
  Col,
  Label,
  FormGroup,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log("from login");
    event.preventDefault();

    fetch("https://trash-app-back.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
      .then(response => {
        return response.json();
      })
      .then(user => {
        if (!user.message) {
          localStorage.setItem("token", user.jwt);
          localStorage.setItem("currentUser_id", user.id);
          localStorage.setItem("currentUser_username", user.username);
          this.props.auth();
          // <Redirect to="/login" />;
          this.props.history.push("/report");
        }
      });
  };

  render() {
    return (
      <div className="bg">
        <nav id="landing_nav">
          <ul className="nav-links">
            <li>
              <h1 id="logo_landing_page">
                trash<span>app</span>
              </h1>
              <div id="logo_subtitle">be part of a cleaner world</div>
            </li>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/register">
              <li>Sign up</li>
            </Link>
            <Link to="/">
              <li>Home</li>
            </Link>
          </ul>
        </nav>
        <Container className="App">
          <div className="row justify-content-center login">
            <div className="col-sm-10 col-md-6 col-xl-4">
              <Form onSubmit={this.handleSubmit} className="form">
                <Col>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="username"
                      name="username"
                      id="username"
                      placeholder="guest"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="trash123"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Button type="submit">Login</Button>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </Form>
            </div>
          </div>
        </Container>
        <div id="guestCredentialsLogin">
          <h3>
            <b>Guest Login</b>{" "}
          </h3>
          <b>
            username: guest <br></br> password: trash123
          </b>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
