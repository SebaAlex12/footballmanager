import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MatchCard from "../matches/MatchCard";

import { replaceSpecialChars } from "../common/functions";

class MatchFinalItem extends Component {
  render() {
    const { matchFinal, matches } = this.props;

    const match = matches.filter(match => match._id === matchFinal.matchId)[0];
    const firstTeamName = match.firstTeamName;
    const firstTeamSufix = replaceSpecialChars(match.firstTeamName);
    const secondTeamName = match.secondTeamName;
    const secondTeamSufix = replaceSpecialChars(match.secondTeamName);

    // console.log("match",match);
    const betting = match.bettings.filter(
      betting => betting.userId === matchFinal.userId
    )[0];

    return (
      <tr>
        <td>{betting.userName}</td>
        <td>
        <div
            className={
              "match-final-item clearfix" +
              (matchFinal.firstHalfHitWinner === 1 ? " bg-hit-winner" : "") +
              (matchFinal.firstHalfHitResult === 1 ? " bg-hit-result" : "")
            }
          >
            <span className="font-weight-bold">I </span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={firstTeamName}
                sufix={firstTeamSufix}
                goals={betting.firstTeamFirstHalfGoals}
              />
            </div>
            <span>:</span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={secondTeamName}
                sufix={secondTeamSufix}
                goals={betting.secondTeamFirstHalfGoals}
              />
            </div>
          </div>
          <div
            className={
              "match-final-item clearfix" +
              (matchFinal.secondHalfHitWinner === 1 ? " bg-hit-winner" : "") +
              (matchFinal.secondHalfHitResult === 1 ? " bg-hit-result" : "")
            }
          >
            <span className="font-weight-bold">II</span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={firstTeamName}
                sufix={firstTeamSufix}
                goals={betting.firstTeamSecondHalfGoals}
              />
            </div>
            <span>:</span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={secondTeamName}
                sufix={secondTeamSufix}
                goals={betting.secondTeamSecondHalfGoals}
              />
            </div>
          </div>
        </td>
        <td>
          <div
            className={
              "match-final-item clearfix" +
              (matchFinal.firstHalfHitWinner === 1 ? " bg-hit-winner" : "") +
              (matchFinal.firstHalfHitResult === 1 ? " bg-hit-result" : "")
            }
          >
            <span className="font-weight-bold">I </span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={firstTeamName}
                sufix={firstTeamSufix}
                goals={match.firstTeamFirstHalfGoals}
              />
            </div>
            <span>:</span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={secondTeamName}
                sufix={secondTeamSufix}
                goals={match.secondTeamFirstHalfGoals}
              />
            </div>
          </div>
          <div
            className={
              "match-final-item clearfix" +
              (matchFinal.secondHalfHitWinner === 1 ? " bg-hit-winner" : "") +
              (matchFinal.secondHalfHitResult === 1 ? " bg-hit-result" : "")
            }
          >
            <span className="font-weight-bold">II</span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={firstTeamName}
                sufix={firstTeamSufix}
                goals={match.firstTeamSecondHalfGoals}
              />
            </div>
            <span>:</span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={secondTeamName}
                sufix={secondTeamSufix}
                goals={match.secondTeamSecondHalfGoals}
              />
            </div>
          </div>
        </td>
        <td style={{fontWeight:"bold"}}>
          <div
            className={
              "match-final-points clearfix" +
              (matchFinal.firstHalfHitWinner === 1 ? " bg-hit-winner" : "") +
              (matchFinal.firstHalfHitResult === 1 ? " bg-hit-result" : "")
            }
          >
            liczba: {matchFinal.firstHalfPoints}
          </div>
          <div
            className={
              "match-final-item clearfix" +
              (matchFinal.secondHalfHitWinner === 1 ? " bg-hit-winner" : "") +
              (matchFinal.secondHalfHitResult === 1 ? " bg-hit-result" : "")
            }
          >
            liczba: {matchFinal.secondHalfPoints}
          </div>
          <div className="match-final-item clearfix">
            razem: {matchFinal.totalPoints}
          </div>
        </td>
      </tr>
    );
  }
}

MatchFinalItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MatchFinalItem);
