import React from "react";
import { Card } from "./Card";

export const Board = props => {
  const cardListRenderer = () => {
    if (!props.sessionSummary) {
      return <div>Please draft...</div>;
    }
    const { cards } = props.sessionSummary;
    const cardElements = cards.map(card => {
      return (
        <div className="four wide column" key={card.base_card_id}>
          <Card card={card} />
        </div>
      );
    });
    return cardElements;
  };

  return (
    <div>
      <div className="ui grid">{cardListRenderer()}</div>
    </div>
  );
};
