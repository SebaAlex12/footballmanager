import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { defaultTeams } from "../teams/TeamsDataForm";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { addMatch } from "../../actions/matchActions";
import { getTeams } from "../../actions/teamActions";
import moment from "moment";

class MatchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      firstTeamName: "",
      secondTeamName: "",
      firstTeamFirstHalfGoals: "",
      firstTeamSecondHalfGoals: "",
      secondTeamFirstHalfGoals: "",
      secondTeamSecondHalfGoals: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    // console.log("ddd");
    this.props.getTeams();
    // console.log(this.state);
    // // console.log(this.props.getTeams());
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    //  console.log(newProps.errors);
  }

  onSubmit(e) {
    e.preventDefault();

    const dateToFormat = moment(
      `${this.state.date} ${this.state.time}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format();

    const newMatch = {
      date: dateToFormat,
      firstTeamName: this.state.firstTeamName,
      secondTeamName: this.state.secondTeamName,
      firstTeamFirstHalfGoals: this.state.firstTeamFirstHalfGoals,
      firstTeamSecondHalfGoals: this.state.firstTeamSecondHalfGoals,
      secondTeamFirstHalfGoals: this.state.secondTeamFirstHalfGoals,
      secondTeamSecondHalfGoals: this.state.secondTeamSecondHalfGoals
    };
    this.props.addMatch(newMatch);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, teams } = this.state;

    const options = defaultTeams;

    return (
      <div className="post-form mb-3">
        {/* <Moment format="D MMM YYYY">1976-04-19T12:59-0500</Moment> */}
        <div className="card card-info">
          <div className="card-header bg-info text-white">Dodaj mecz</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="">Podaj datę meczu</label>
                  <TextFieldGroup
                    placeholder="Podaj datę meczu"
                    name="date"
                    type="date"
                    value={this.state.date}
                    onChange={this.onChange}
                    error={errors.date}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="">Podaj godzinę meczu</label>
                  <div className="form-group">
                    <input
                      type="time"
                      name="time"
                      value={this.state.time}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <SelectListGroup
                    placeholder="Kraj pochodzenia I drużyna"
                    name="firstTeamName"
                    value={this.state.firstTeamName}
                    onChange={this.onChange}
                    options={options}
                    error={errors.firstTeamName}
                  />
                  <SelectListGroup
                    placeholder="Kraj pochodzenia II drużyna"
                    name="secondTeamName"
                    value={this.state.secondTeamName}
                    onChange={this.onChange}
                    options={options}
                    error={errors.secondTeamName}
                  />
                </div>
                <div className="col-md-4">
                  <TextFieldGroup
                    placeholder="Liczba bramek I połowa I drużyna"
                    name="firstTeamFirstHalfGoals"
                    value={this.state.firstTeamFirstHalfGoals}
                    onChange={this.onChange}
                    error={errors.firstTeamFirstHalfGoals}
                  />
                  <TextFieldGroup
                    placeholder="Liczba bramek II połowa I drużyna"
                    name="firstTeamSecondHalfGoals"
                    value={this.state.firstTeamSecondHalfGoals}
                    onChange={this.onChange}
                    error={errors.firstTeamSecondHalfGoals}
                  />
                </div>
                <div className="col-md-4">
                  <TextFieldGroup
                    placeholder="Liczba bramek I połowa II drużyna"
                    name="secondTeamFirstHalfGoals"
                    value={this.state.secondTeamFirstHalfGoals}
                    onChange={this.onChange}
                    error={errors.secondTeamFirstHalfGoals}
                  />
                  <TextFieldGroup
                    placeholder="Liczba bramek II połowa II drużyna"
                    name="secondTeamSecondHalfGoals"
                    value={this.state.secondTeamSecondHalfGoals}
                    onChange={this.onChange}
                    error={errors.secondTeamSecondHalfGoals}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-dark float-right">
                Dodaj
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

MatchForm.propTypes = {
  addMatch: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  firstTeamName: state.firstTeamName,
  secondTeamName: state.secondTeamName,
  firstTeamFirstHalfGoals: state.firstTeamFirstHalfGoals,
  firstTeamSecondHalfGoals: state.firstTeamSecondHalfGoals,
  secondTeamFirstHalfGoals: state.secondTeamFirstHalfGoals,
  secondTeamSecondHalfGoals: state.secondTeamSecondHalfGoals,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMatch, getTeams }
)(MatchForm);
