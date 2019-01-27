import React from "react";

export const Summary = props => {
  if (props.summary === null) {
    return (
      <div className="ui segment">
        <h2 className="ui center aligned icon header">
          <i className="circular chart pie icon" />
          Summary Information
        </h2>
      </div>
    );
  }
  const {
    spent,
    num_commons,
    num_uncommons,
    num_rares,
    num_items,
    num_heroes,
    cards
  } = props.summary;
  return (
    <div className="ui segment">
      <h2 className="ui center aligned icon header">
        <i className="circular chart pie icon" />
        Summary Information
      </h2>
      <div className="ui large relaxed divided list">
        <div className="item">
          <i className="large money bill alternate middle aligned icon" />
          <div className="content">
            <div className="header">Spent: {spent}</div>
          </div>
        </div>
        <div className="item">
          <i className="large gem middle aligned icon" />
          <div className="content">
            <div className="header">Rares: {num_rares}</div>
          </div>
        </div>
        <div className="item">
          <i className="large archive sign middle aligned icon" />
          <div className="content">
            <div className="header">Uncommons: {num_uncommons}</div>
          </div>
        </div>
        <div className="item">
          <i className="large trash middle aligned icon" />
          <div className="content">
            <div className="header">Commons: {num_commons}</div>
          </div>
        </div>
        <div className="item">
          <i className="large user middle aligned icon" />
          <div className="content">
            <div className="header">Heroes: {num_heroes}</div>
          </div>
        </div>
        <div className="item">
          <i className="large gavel middle aligned icon" />
          <div className="content">
            <div className="header">Items: {num_items}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
