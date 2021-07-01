import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserById } from "../../actions/userActions";
import MatchCard from "../matches/MatchCard";

class MatchBettingsItem extends Component {
  render() {
    const { betting, match } = this.props;

    const firstTeamName = match.firstTeamName.split("_")[0];
    const firstTeamSufix = match.firstTeamName.split("_")[1];
    const secondTeamName = match.secondTeamName.split("_")[0];
    const secondTeamSufix = match.secondTeamName.split("_")[1];

    const overtimeContent = (typeof betting.firstTeamOvertimeGoals === "number" && typeof betting.secondTeamOvertimeGoals === "number") ? 
      (<td>  
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
        </td>) : null;

    return (
      <tr>
        <th scope="row">{betting.userName}</th>
        <td>
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
        </td>
        <td>
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
        </td>
        { overtimeContent }
      </tr>
    );
  }
}

MatchBettingsItem.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserById }
)(MatchBettingsItem);
