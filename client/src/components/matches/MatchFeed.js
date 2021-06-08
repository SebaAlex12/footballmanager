import React, { Component } from "react";
import PropTypes from "prop-types";
import MatchItem from "./MatchItem";

class MatchFeed extends Component {
  render() {
    const { matches } = this.props;
    let counter = 1;
    return matches.map(match => <MatchItem counter={counter++} key={match._id} match={match} />);
  }
}

MatchFeed.propTypes = {
  matches: PropTypes.array.isRequired
};

export default MatchFeed;
