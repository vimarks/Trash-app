import React, { Component } from 'react';

export default class Registration extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }


  handleSubmit = (event) => {
    event.preventDefault()
    console.log('daddy')

      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({ user: {
            username: this.state.username,
            password: this.state.password
          }
          })

      })
      .then(response => {
      return response.json();
    })
      .then(userObj => {
        console.log("Here is the response!")
      console.log(userObj);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit"> Register </button>
        </form>
      </div>
    )
  }
}
