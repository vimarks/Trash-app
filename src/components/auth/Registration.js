import React, { Component } from "react";
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
        <Container className="App">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h2>Register</h2>
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
            <Button type="submit"> Submit </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
