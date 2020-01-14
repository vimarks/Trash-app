import React from "react";
import Trophy from "./Trophy";
import "./auth/style.css";

class TrophyRoom extends React.Component {
  token = localStorage.getItem("token");

  constructor() {
    super();
    this.state = {
      userTrophies: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/trashes/getTrophies", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          userTrophies: data.userTrophies
        });
      });
  }
  render() {
    return (
      <div class="row trophyRoom">
        {this.state.userTrophies.length > 0 &&
          this.state.userTrophies.map(trash => (
            <Trophy
              id={trash.id}
              description={trash.description}
              bounty={trash.bounty}
              date={trash.updated_at}
            />
          ))}
      </div>
    );
  }
}

export default TrophyRoom;
