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
      <div>
        <div className="ui container">
          <button onClick={this.onDraftHandler} className="ui basic button">
            <i className="icon user" />
            Draft
          </button>
        </div>
        <Board sessionSummary={this.state.sessionSummary} />
      </div>
    );
  }
}
