// use client
import React, { useState } from "react";
import "./Card.css";

const Card = ({
  title,
  profileImg,
  productImg,
  productName,
  price,
  details,
  hastag,
  likecount,
  children,
  commentCount,
}) => {
  const [showComment, setShowComment] = useState(false);

  const toggleComment = () => {
    setShowComment(!showComment);
  };
  return (
    <div className="card">
      <div className="cardheader">
        <img src={profileImg} alt="Card image" className="profilepic my-3" />
        <h4 className="title ml-2"> {title}</h4>
      </div>
      <div className="content">
        <div className="imagecontainer">
          <img src={productImg} alt="Card image" className="productpic" />
          <div className="innerproduct">
            <p className="productText">{productName}</p>
            <p className="productPrice">{price}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span>
            <img
              src="https://i.ibb.co/Qcgq1wh/pngwing-com-1.png"
              alt="heart"
              className="heartlogo"
            />
          </span>
          <span className="liketext ml-2"> {likecount} Likes</span>
        </div>
        <p className="deatils">{details}</p>
        <p className="hastag">{hastag}</p>
        <button onClick={toggleComment} className="togglebutton">
          {showComment
            ? "Hide Comment"
            : `View ${commentCount} Comment${commentCount !== 1 ? "s" : ""}`}
        </button>
        {/* {showComment && <p>This is a sample</p>} */}
      </div>
      {children}
    </div>
  );
};

export default Card;
