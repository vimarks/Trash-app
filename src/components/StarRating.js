import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = props => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  let token = localStorage.getItem("token");
  const isEnabled = rating;

  const submitRating = () => {
    fetch("http://localhost:3001/reputations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        reporter_id: props.reporter_id,
        trash_id: props.trash_id,
        cleaner_id: localStorage.getItem("currentUser_id"),
        rating: rating
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        props.setReputations(data.reputations);
        setRating(null);
      });
  };

  return (
    <div className="starGroup">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107 " : "#e4e5e9"}
              size={100}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      {rating ? (
        <button id="ratingSubmit" onClick={submitRating}>
          {" "}
          submit{" "}
        </button>
      ) : null}
    </div>
  );
};

export default StarRating;
