import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = props => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  let token = localStorage.getItem("token");

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
        rating: rating
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.avgRating);
      });

    setRating(null);
  };

  return (
    <div>
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
      {rating ? <button onClick={submitRating}> submit </button> : null}
    </div>
  );
};

export default StarRating;
