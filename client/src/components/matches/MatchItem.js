import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Administrators from "../../Admin";

import { deleteMatch, updateMatch } from "../../actions/matchActions";
import { addMatchFinals } from "../../actions/matchFinalActions";
import TextFieldGroup from "../common/TextFieldGroup";
import MatchBettingsFeed from "../bettings/MatchBettingsFeed";
import MatchBettingUserForm from "../bettings/MatchBettingUserForm";
import Moment from "react-moment";
import moment from "moment";

import MatchCard from "../matches/MatchCard";

import { replaceSpecialChars } from "../common/functions";

class MatchItem extends Component {
  constructor(props) {
    super(props);
    //  console.log(props);
    this.state = {
      firstTeamName: props.match.firstTeamName,
      secondTeamName: props.match.secondTeamName,
      firstTeamFirstHalfGoals: props.match.firstTeamFirstHalfGoals,
      firstTeamSecondHalfGoals: props.match.firstTeamSecondHalfGoals,
      firstTeamOvertimeGoals: props.match.firstTeamOvertimeGoals,
      secondTeamFirstHalfGoals: props.match.secondTeamFirstHalfGoals,
      secondTeamSecondHalfGoals: props.match.secondTeamSecondHalfGoals,
      secondTeamOvertimeGoals: props.match.secondTeamOvertimeGoals,
      disabled: 0,
      closed: 0,
      showMatchForm: false,
      showMatchBettingFeed: false,
      showMatchBettingUser: false
    };
    //  console.log(this.state);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // delete match has been disabled
  // onDeleteClick(id) {
  //   this.props.deleteMatch(id);
  // }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUpdateClick(id) {
    const matchData = {
      id: id,
      firstTeamFirstHalfGoals: this.state.firstTeamFirstHalfGoals,
      firstTeamSecondHalfGoals: this.state.firstTeamSecondHalfGoals,
      firstTeamOvertimeGoals: this.state.firstTeamOvertimeGoals,
      secondTeamFirstHalfGoals: this.state.secondTeamFirstHalfGoals,
      secondTeamSecondHalfGoals: this.state.secondTeamSecondHalfGoals,
      secondTeamOvertimeGoals: this.state.secondTeamOvertimeGoals
    };

    this.props.updateMatch(matchData);
  }

  onDisableClick(id) {
    const { match } = this.props;
    const matchData = {
      id: id,
      disabled: match.disabled === 0 ? 1 : 0
    }
    this.props.updateMatch(matchData);
  }

  onFinalClick = async(id) => {
      try{
        const finalData = {
          matchId: id
        };
        const matchData = {
          id: id,
          firstTeamFirstHalfGoals: this.state.firstTeamFirstHalfGoals,
          firstTeamSecondHalfGoals: this.state.firstTeamSecondHalfGoals,
          firstTeamOvertimeGoals: this.state.firstTeamOvertimeGoals,
          secondTeamFirstHalfGoals: this.state.secondTeamFirstHalfGoals,
          secondTeamSecondHalfGoals: this.state.secondTeamSecondHalfGoals,
          secondTeamOvertimeGoals: this.state.secondTeamOvertimeGoals,
          disabled: 1,
          closed: 1
        };
        const response = await this.props.updateMatch(matchData);
        if(response){
            this.props.addMatchFinals(finalData);
        }
    }catch(errors){
      console.log("errors",errors);
    }
  }

  render() {
    const { match, counter } = this.props;
    const { user } = this.props.auth;
    const { showMatchBettingUser } = this.state;
    const firstTeamName = match.firstTeamName;
    const firstTeamSufix = replaceSpecialChars(match.firstTeamName);
    const secondTeamName = match.secondTeamName;
    const secondTeamSufix = replaceSpecialChars(match.secondTeamName);

    const formButton = Administrators.includes(user.email) && match.closed === 0 ? (
      <button
              className="btn btn-light float-right"
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => {
                this.setState({
                  showMatchForm: !this.state.showMatchForm
                });
              }}
            >
              Formularz
            </button>
    ) : null;

    const switchDisableButton = Administrators.includes(user.mail) && match.closed === 0 ? (
      <button
              className={`btn float-right ${match.disabled === 1 ? "btn-danger" : "btn-secondary"}`}
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => this.onDisableClick(match._id)}
            >
              { match.disabled ? "Odblokuj" : "Zablokuj" }
            </button>
    ) : null;

    const overtimeContent = match.firstTeamOvertimeGoals && match.secondTeamOvertimeGoals ? (
        <React.Fragment>
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
            <div className="d-inline ml-2 mr-2">
                [ dogrywka ]
            </div>
      </React.Fragment>
    ) : null;

    let statusClass = "";
    if(match.disabled === 1){
      statusClass = "disabled";
    }
    if(match.closed === 1){
      statusClass = "closed";
    }

    let matchBettingContent = null;
    if(match.closed !== 1 && match.disabled !== 1){
      if(showMatchBettingUser){
          matchBettingContent = <MatchBettingUserForm match={match} />
      }
    }
    const matchBettingUser = match.bettings.filter(betting => user.id === betting.userId);
    const matchBettingsFiltered = match.disabled == 1 ? match.bettings : matchBettingUser;

    return (
      <div
        className={statusClass}
        style={{
          marginBottom: "10px",
          border: "1px solid rgba(0,0,0,.125)",
          borderRadius: "5px"
        }}
      >
        <div className="card card-info">
          <div
            className="card-header bg-info text-white"
            style={{ fontWeight: "bold" }}
          >
            <p className="text-white mb-0">
              [{counter}] 
              Termin rozgrywki: {}
              { <Moment format="YYYY-MM-DD HH:mm">{moment(match.date).subtract(1, 'hours')}</Moment> }
              {/* <span>{ match.date }</span> */}
              { matchBettingUser.length === 1 && ( 
                <span className="card-betting-info">
                  obstawiłeś ten mecz !
                  <img src="img/ball.png" alt="" />
                </span> 
              )}
              <span style={{float:"right",display:"block"}}>liczba zakładów: { match.bettings.length }</span>
            </p>

            {/* match cards */}
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
            <div className="d-inline ml-2 mr-2">
                [ I połowa ]
            </div>
            <br />
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
            <div className="d-inline ml-2 mr-2">
                [ II połowa ]
            </div>
            <br />
            { overtimeContent }
            { switchDisableButton }
            { formButton }
            <button
              className="btn btn-dark float-right"
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => {
                this.setState({
                  showMatchBettingFeed: !this.state.showMatchBettingFeed
                });
              }}
            >
              Lista zakładów
            </button>
          </div>
        {this.state.showMatchForm && match.closed !== 1 ? (
          <form onSubmit={this.onSubmit} className="ml-2 mr-2">
            <div className="row">
              <div className="col-md-2 text-center">
                <p
                  className="mt-2"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  I drużyna
                </p>
                <br />
                <img src={`img/flags/${firstTeamSufix}.jpg`} alt="" />
                <br />
                <p className="text-center">{firstTeamName}</p>
              </div>
              <div className="col-md-3">
                <div className="lead">
                  Bramki do przerwy:
                  <TextFieldGroup
                    name="firstTeamFirstHalfGoals"
                    value={this.state.firstTeamFirstHalfGoals}
                    onChange={this.onChange}
                  />
                </div>
                <div className="lead">
                  Wynik po drugiej połowie:
                  <TextFieldGroup
                    name="firstTeamSecondHalfGoals"
                    value={this.state.firstTeamSecondHalfGoals}
                    onChange={this.onChange}
                  />
                </div>
                <div className="lead">
                  Wynik po dogrywce:
                  <TextFieldGroup
                    name="firstTeamOvertimeGoals"
                    value={this.state.firstTeamOvertimeGoals}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  fontSize: "90px",
                  fonstWeight: "bold",
                  textAlign: "center"
                }}
              >
                :
                {/* <button
                  onClick={this.onUpdateClick.bind(this, match._id)}
                  className="btn btn-info"
                >
                  <i className="fas fa-pen-square mr-1" />
                  Uaktualnij wynik
                </button> */}
              </div>
              <div className="col-md-2 text-center">
                <p
                  className="mt-2"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  II drużyna
                </p>
                <br />
                <img src={`img/flags/${secondTeamSufix}.jpg`} alt="" />
                <br />
                <p className="text-center">{secondTeamName}</p>
              </div>
              <div className="col-md-3">
                <div className="lead">
                  Bramki do przerwy:
                  <TextFieldGroup
                    name="secondTeamFirstHalfGoals"
                    value={this.state.secondTeamFirstHalfGoals}
                    onChange={this.onChange}
                  />
                </div>
                <div className="lead">
                  Wynik po drugiej połowie:
                  <TextFieldGroup
                    name="secondTeamSecondHalfGoals"
                    value={this.state.secondTeamSecondHalfGoals}
                    onChange={this.onChange}
                  />
                </div>
                <div className="lead">
                  Wynik po dogrywce:
                  <TextFieldGroup
                    name="secondTeamOvertimeGoals"
                    value={this.state.secondTeamOvertimeGoals}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="col-md-12 d-flex flex-column">
                <button
                  onClick={ () => window.confirm('Spowoduje bezpowrotne zamkniecie meczu !') && this.onFinalClick(match._id) }
                  type="button"
                  className="btn mt-1 btn-danger"
                >
                  finalizuj
                </button>
                {/* <button
                  onClick={this.onDeleteClick.bind(this, match._id)}
                  type="button"
                  className="btn btn-danger mt-1 float-right"
                >
                  <i className="fas fa-times" />
                </button> */}
              </div>
            </div>
          </form>
        ) : null}
        {this.state.showMatchBettingFeed ? (
              <MatchBettingsFeed bettings={matchBettingsFiltered} match={match} />
        ) : null}
        <button
            type="button"
            className="btn btn-success mb-auto mb-1"
            onClick={() => {
              this.setState({
                showMatchBettingUser: !this.state.showMatchBettingUser
              });
            }}
          >
            Obstaw
        </button>
        { matchBettingContent }
        </div>
      </div>
    );
  }
}

MatchItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteMatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteMatch, updateMatch, addMatchFinals }
)(MatchItem);
