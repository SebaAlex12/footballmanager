import React, { Component } from "react";
import PropTypes from "prop-types";
import MatchFinalItem from "./MatchFinalItem";

class MatchFinalFeed extends Component {
  render() {
    const { matchFinals } = this.props;
    const { matches } = this.props;
    // const matchFinalContent = matchFinals.map(matchFinal => (
    //   <MatchFinalItem key={matchFinal._id} matchFinal={matchFinal} />
    // ));
    return (
      <div>
        <h2>Statystyka meczowa</h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col" style={{ width: "200px" }}>Użytkownik</th>
              <th scope="col" style={{ width: "350px" }}>
                Zakłady: I połowa II połowa Dogrywka
              </th>
              <th scope="col" style={{ width: "350px" }}>
                Wynik spotkania: I połowa II połowa Dogrywka
              </th>
              <th scope="col" style={{ width:"150px" }}>
                <span className="d-block">Punkty za mecz: I połowa II połowa Dogrywka</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {matchFinals.map(matchFinal => (
              <MatchFinalItem
                key={matchFinal._id}
                matches={matches}
                matchFinal={matchFinal}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

MatchFinalFeed.propTypes = {
  matchFinals: PropTypes.array.isRequired,
  matches: PropTypes.array.isRequired
};

export default MatchFinalFeed;
