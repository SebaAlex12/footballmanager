import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MatchCard from "../matches/MatchCard";
import Moment from "react-moment";
import moment from "moment";

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

    const overtimeBettingContent = (typeof betting.firstTeamOvertimeGoals === "number" && typeof betting.secondTeamOvertimeGoals === "number") ? (
        <div
                    className={
                      "match-final-item clearfix" +
                      (matchFinal.overtimeHitWinner === 1 ? " bg-hit-winner" : "") +
                      (matchFinal.overtimeHitResult === 1 ? " bg-hit-result" : "")
                    }
                  >
                    <span className="font-weight-bold">D</span>
                    <div className="d-inline ml-2 mr-2">
                      <MatchCard
                        name={firstTeamName}
                        sufix={firstTeamSufix}
                        goals={betting.firstTeamOvertimeGoals}
                      />
                    </div>
                    <span>:</span>
                    <div className="d-inline ml-2 mr-2">
                      <MatchCard
                        name={secondTeamName}
                        sufix={secondTeamSufix}
                        goals={betting.secondTeamOvertimeGoals}
                      />
                    </div>
          </div>
    ) : null;

    const overtimeContent = (typeof match.firstTeamOvertimeGoals === "number" && typeof match.secondTeamOvertimeGoals === "number") ? (
      <div
            className={
              "match-final-item clearfix" +
              (matchFinal.overtimeHitWinner === 1 ? " bg-hit-winner" : "") +
              (matchFinal.overtimeHitResult === 1 ? " bg-hit-result" : "")
            }
          >
            <span className="font-weight-bold">D</span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={firstTeamName}
                sufix={firstTeamSufix}
                goals={match.firstTeamOvertimeGoals}
              />
            </div>
            <span>:</span>
            <div className="d-inline ml-2 mr-2">
              <MatchCard
                name={secondTeamName}
                sufix={secondTeamSufix}
                goals={match.secondTeamOvertimeGoals}
              />
            </div>
          </div>
    ) : null;

    const overtimeCounterContent = (
        <div
        className={
          "match-final-item clearfix" +
          (matchFinal.overtimeHitWinner === 1 ? " bg-hit-winner" : "") +
          (matchFinal.overtimeHitResult === 1 ? " bg-hit-result" : "")
        }
      >
        liczba: {matchFinal.overtimePoints}
      </div>  
    );

    return (
      <tr>
        <td>
          {betting.userName}
          <div>{ <Moment format="YYYY-MM-DD HH:mm">{moment(matchFinal.matchDate).subtract(2, 'hours')}</Moment> }</div>
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
          { overtimeBettingContent }
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
          { overtimeContent }
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
          { overtimeCounterContent }
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
