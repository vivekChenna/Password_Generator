import React, { useState } from "react";

const Card = ({ image, price, info, id, name, dataHandler }) => {
  const [readMore, setReadMore] = useState(true);
  const description = readMore ? `${info.substring(0, 200)}...` : info;

  function DescHandler() {
    setReadMore(!readMore);
  }

  return (
    <div className="card">
      <img src={image} className="tour-img" alt="" />

      <div className="tour-info">
        <div className="tour-details">
          <div className="tour-price">{price}</div>
          <div className="tour-name">{name}</div>
        </div>

        <div className="description">
          {description}
          <span className="read-more" onClick={DescHandler}>
            {readMore ? "ReadMore" : "ShowLess"}
          </span>
        </div>
      </div>

      <button className="btn-red" onClick={() => dataHandler(id)}>
        Not Interested
      </button>
    </div>
  );
};

export default Card;
