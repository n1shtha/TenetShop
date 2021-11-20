import ReactStars from "react-rating-stars-component";
import React from "react";
import profilePng from "../../images/profile.png";

const ReviewCard = ({review}) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "gold",
        size: window.innerWidth < 600 ? 15 : 20,
        value: review?.ratings,
        isHalf: true,
      };
    return (<div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span >{review.comment}</span>
    </div>
    );
};

export default ReviewCard;
