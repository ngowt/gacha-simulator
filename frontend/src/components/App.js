import React from "react";
import { Board } from "./Board";
import { Summary } from "./Summary";
import { Draft } from "../services/Draft";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sessionSummary: null, summary: null };
  }

  updateSummary = () => {
    if (this.state.summary === null) {
      return { ...this.state.sessionSummary, spent: 2.69 };
    }
    const obj = { ...this.state.summary };
    obj.spent = obj.spent + 2.69;
    obj.num_commons += this.state.sessionSummary.num_commons;
    obj.num_uncommons += this.state.sessionSummary.num_uncommons;
    obj.num_rares += this.state.sessionSummary.num_rares;
    obj.num_items += this.state.sessionSummary.num_items;
    obj.num_heroes += this.state.sessionSummary.num_heroes;
    obj.cards = [...obj.cards, ...this.state.sessionSummary.cards];
    return obj;
  };

  handleReset = () => {
    this.setState({ sessionSummary: null });
    this.setState({ summary: null });
  };

  handleDraft = async () => {
    const response = await Draft.post("/play");
    this.setState({ sessionSummary: response.data });
    this.setState({ summary: this.updateSummary() });
  };

  render() {
    return (
      <div className="ui three column divided celled grid">
        <div className="row">
          <div className="sixteen wide column">
            <button
              onClick={this.handleDraft}
              className="ui basic button"
              style={{ width: "100%" }}
            >
              <i className="icon play" />
              Draft
            </button>
          </div>
        </div>
        <div className="stretched four wide column">
          <Summary summary={this.state.summary} />
        </div>
        <div className="twelve wide column">
          <div className="row">
            <Board sessionSummary={this.state.sessionSummary} />
          </div>
        </div>
        <div className="row">
          <div className="sixteen wide column">
            <button
              onClick={this.handleReset}
              className="ui basic button"
              style={{ width: "100%" }}
            >
              <i className="icon sync" />
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }
}
