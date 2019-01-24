import React from "react";
import { Card } from "./Card";

export class Board extends React.Component {
  onDraftHandler = () => {
    this.props.onDraft();
  };

  cardListRenderer = () => {
    if (!this.props.sessionSummary) {
      return <div>Please draft...</div>;
    }
    const { cards } = this.props.sessionSummary;
    const cardElements = cards.map(card => {
      return (
        <div className="four wide column" key={card.base_card_id}>
          <Card card={card} />
        </div>
      );
    });
    return cardElements;
  };

  render() {
    return (
      <div>
        <div className="ui container">
          <button onClick={this.onDraftHandler} className="ui basic button">
            <i className="icon user" />
            Draft
          </button>
        </div>
        <div className="ui grid">{this.cardListRenderer()}</div>
      </div>
    );
  }
}
