import React, { Component } from "react";
import PropTypes from "prop-types";
import MatchBettingItem from "./MatchBettingsItem";

class MatchBettingsFeed extends Component {
  render() {
    const { bettings, match } = this.props;
    const bettingItems = bettings.map(betting => (
      <MatchBettingItem key={betting._id} betting={betting} match={match} />
    ));

    const isDisabled = match.disabled === 0 ? {color:"rgb(210 65 65)"} : {color:"#17a2b8"};

    return (
      <div className="bettings-box">
        <table className="table table-striped table-dark table-responsive mb-0">
          <thead>
            <tr><th style={isDisabled}>
              { 
              match.disabled === 0 ? 
              "mecz się jeszcze nie rozpoczął dlatego widzisz tylko swoje obstawienie wyniku :(" 
              : 
              "mecz się rozpoczął / albo zakończył teraz możesz porównać swoje obstawienie wyniku z ziomkami :)" }</th></tr>
          </thead>
        </table>
        <table className="table table-striped table-dark table-responsive mb-0">
          <thead>
            <tr>
              <th scope="col">Użytkownik</th>
              <th scope="col">I połowa: I drużyna II drużyna</th>
              <th scope="col">II połowa: I drużyna II drużyna</th>
              <th scope="col">Dogrywka</th>
            </tr>
          </thead>
          <tbody>{bettingItems}</tbody>
        </table>
      </div>
    );
  }
}

MatchBettingsFeed.propTypes = {
  bettings: PropTypes.array.isRequired
};

export default MatchBettingsFeed;
