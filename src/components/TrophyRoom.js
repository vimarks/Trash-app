import React, { useEffect, useState } from "react";
import Trophy from "./Trophy";
import "./auth/style.css";

export default function TrophyRoom() {
  const [userTrophies, setUserTrophies] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3001/trashes/getTrophies", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
        setUserTrophies(data.userTrophies);
      });
  });

  return (
    <div class="row trophyRoom">
      {userTrophies.length > 0 &&
        userTrophies.map(trash => (
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
