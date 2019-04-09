import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteMatch, updateMatch } from "../../actions/matchActions";
import { addMatchFinals } from "../../actions/matchFinalActions";
import TextFieldGroup from "../common/TextFieldGroup";
import MatchBettingsFeed from "../bettings/MatchBettingsFeed";
import MatchBettingUserForm from "../bettings/MatchBettingUserForm";
import Moment from "react-moment";
import MatchCard from "../matches/MatchCard";

class MatchItem extends Component {
  constructor(props) {
    super(props);
    //  console.log(props);
    this.state = {
      firstTeamName: props.match.firstTeamName,
      secondTeamName: props.match.secondTeamName,
      firstTeamFirstHalfGoals: props.match.firstTeamFirstHalfGoals,
      firstTeamSecondHalfGoals: props.match.firstTeamSecondHalfGoals,
      secondTeamFirstHalfGoals: props.match.secondTeamFirstHalfGoals,
      secondTeamSecondHalfGoals: props.match.secondTeamSecondHalfGoals,
      disabled: 0,
      showMatchForm: false,
      showMatchBettingFeed: false,
      showMatchBettingUser: false
    };
    //  console.log(this.state);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onDeleteClick(id) {
    this.props.deleteMatch(id);
  }

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
      secondTeamFirstHalfGoals: this.state.secondTeamFirstHalfGoals,
      secondTeamSecondHalfGoals: this.state.secondTeamSecondHalfGoals
    };

    this.props.updateMatch(matchData);
  }

  onFinalClick(id) {
    //  console.log(this.props.auth);

    const finalData = {
      matchId: id
    };
    const matchData = {
      id: id,
      disabled: 1
    };
    this.props.addMatchFinals(finalData);
    this.props.updateMatch(matchData);
  }

  render() {
    const { match } = this.props;
    const firstTeamName = this.state.firstTeamName.split("_")[0];
    const firstTeamSufix = this.state.firstTeamName.split("_")[1];
    const secondTeamName = this.state.secondTeamName.split("_")[0];
    const secondTeamSufix = this.state.secondTeamName.split("_")[1];

    return (
      <div
        className={match.disabled === 1 ? "disabled" : ""}
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
            <p className="text-white mb-0 mr-4">
              Termin rozgrywki:{" "}
              <Moment format="YYYY-MM-DD HH:mm">{match.date}</Moment>
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
          {this.state.showMatchBettingFeed ? (
            <MatchBettingsFeed bettings={match.bettings} match={match} />
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
          {this.state.showMatchBettingUser && match.disabled !== 1 ? (
            <MatchBettingUserForm match={match} />
          ) : null}
        </div>
        {this.state.showMatchForm && match.disabled !== 1 ? (
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-3 text-center">
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
              <div className="col-md-2">
                <div className="lead float-left">
                  Liczba bramek I połowa:
                  <TextFieldGroup
                    name="firstTeamFirstHalfGoals"
                    value={this.state.firstTeamFirstHalfGoals}
                    onChange={this.onChange}
                  />
                </div>
                <div className="lead float-right">
                  Liczba bramek II połowa:
                  <TextFieldGroup
                    name="firstTeamSecondHalfGoals"
                    value={this.state.firstTeamSecondHalfGoals}
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
                <button
                  onClick={this.onUpdateClick.bind(this, match._id)}
                  className="btn btn-info"
                >
                  <i className="fas fa-pen-square mr-1" />
                  Uaktualnij wynik
                </button>
              </div>
              <div className="col-md-3 text-center">
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
              <div className="col-md-2">
                <div className="lead float-left">
                  Liczba bramek I połowa:
                  <TextFieldGroup
                    name="secondTeamFirstHalfGoals"
                    value={this.state.secondTeamFirstHalfGoals}
                    onChange={this.onChange}
                  />
                </div>
                <div className="lead float-right">
                  Liczba bramek II połowa:
                  <TextFieldGroup
                    name="secondTeamSecondHalfGoals"
                    value={this.state.secondTeamSecondHalfGoals}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="col-md-12 float-right d-flex flex-column">
                <button
                  onClick={this.onFinalClick.bind(this, match._id)}
                  type="button"
                  className="btn mt-1 float-right"
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
