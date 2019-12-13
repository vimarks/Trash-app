import React, { Component } from 'react';

export default class Login extends Component {

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

      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({ user:
          {
            username: this.state.username,
            password: this.state.password
          }
        })
      })
      .then(response => {
        return response.json();
    })
      .then(user => {
        console.log(user)
        localStorage.setItem('token', user.jwt)
        localStorage.setItem('currentUser_id', user.id)

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

          <button type="submit"> Login </button>
        </form>
      </div>
    )
  }
}
