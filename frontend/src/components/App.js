import React from "react";
import { Board } from "./Board";
import { Draft } from "../services/Draft";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sessionSummary: null };
  }

  onDraftHandler = async () => {
    const response = await Draft.post("/play");
    this.setState({ sessionSummary: response.data });
  };

  render() {
    return (
      <div className="ui three column divided celled grid">
        <div className="row">
          <div className="sixteen wide column">
            <button
              onClick={this.onDraftHandler}
              className="ui basic button"
              style={{ width: "100%" }}
            >
              <i className="icon play" />
              Draft
            </button>
          </div>
        </div>
        <div className="stretched four wide column">
          <div className="ui placeholder segment" />
        </div>
        <div className="twelve wide column">
          <div className="row">
            <Board sessionSummary={this.state.sessionSummary} />
          </div>
        </div>
      </div>
    );
  }
}
