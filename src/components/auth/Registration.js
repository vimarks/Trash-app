import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Container,
  Col,
  Label,
  FormGroup,
  Button
} from "reactstrap";

export default class Registration extends Component {
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
    event.preventDefault();

    fetch("http://localhost:3001/users", {
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
      .then(userObj => {
        this.props.history.push("/login");
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
            <Link to="/">
              <li>Home</li>
            </Link>

            <Link to="/login">
              <li>Login</li>
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
                      placeholder="username"
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
                      placeholder="********"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Button className="verify" type="submit">
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
