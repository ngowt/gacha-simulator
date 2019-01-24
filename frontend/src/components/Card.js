import React from "react";

export const Card = props => {
  const { card_name, large_image } = props.card;
  return (
    <img src={large_image ? large_image.default : ""} alt={card_name.english} />
  );
};
