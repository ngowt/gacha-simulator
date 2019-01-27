import React from "react";
import { Card } from "./Card";

export const Board = props => {
  const cardListRenderer = () => {
    if (!props.sessionSummary) {
      return <div>Please draft...</div>;
    }
    const { cards } = props.sessionSummary;
    const row1Cards = cards.slice(0, 6);
    const row2Cards = cards.slice(6);
    const row1 = row1Cards.map((card, index) => {
      return (
        <div className="column" key={`${card.base_card_id}-${index}`}>
          <Card card={card} />
        </div>
      );
    });
    const row2 = row2Cards.map((card, index) => {
      return (
        <div className="column" key={`${card.base_card_id}-${index + 6}`}>
          <Card card={card} />
        </div>
      );
    });
    return (
      <div className="ui celled grid">
        <div className="six column row">{row1}</div>
        <div className="six column row">{row2}</div>
      </div>
    );
  };

  return cardListRenderer();
};
