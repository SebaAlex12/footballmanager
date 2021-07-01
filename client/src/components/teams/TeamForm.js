import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addTeam, getTeams } from "../../actions/teamActions";
import DefaultTeams from "./TeamsDataForm";

class TeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      info: "",
      errors: {}
    };
    // console.log(this.props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    //  const { team } = this.props;
    const newTeam = {
      country: this.state.country,
      info: this.state.info
      //    avatar: user.avatar
    };
    this.props.addTeam(newTeam);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  filterOptions = (teams, options) => {
    return options.filter(option => {
      let value = option.value;
      let exists = false;

      teams.map(team => {
        if (team.country === value) {
          return (exists = true);
        }
      });

      if (exists) {
        return null;
      } else {
        return option;
      }
    });
  };

  render() {
    const { teams } = this.props;
    const { errors } = this.state;

    let options = DefaultTeams;

    // remove teams from options whitch already have been added
    if (teams.length > 0) {
      options = this.filterOptions(teams, DefaultTeams);
    }

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Dodaj drużynę</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <SelectListGroup
                  placeholder="Kraj pochodzenia"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                  options={options}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Ogólne informacje"
                  name="info"
                  value={this.state.info}
                  onChange={this.onChange}
                  error={errors.info}
                />
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

TeamForm.propTypes = {
  addTeam: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  teams: state.team.teams,
  country: state.country,
  info: state.info,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTeam, getTeams }
)(TeamForm);
