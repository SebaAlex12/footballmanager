import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import MatchForm from "./MatchForm";
import MatchFeed from "./MatchFeed";
import Spinner from "../common/spinner";
import { getMatches } from "../../actions/matchActions";

import { Container } from "../../themes/basic";
import Administrators from "../../Admin";

import MatchImportForm from "./MatchImportForm";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMatchForm: false,
      showImportForm: false
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/");
    }
    this.props.getMatches();
  }

  generateMatchFinals = async() => {
    try{
      const response = await axios.post("api/match_finals/generate");
      if(response){
        console.log("response",response);
      }
    }catch(errors){
      console.log("errors",errors);
    }
  }

  render() {
    const { matches, loading } = this.props.match;
    const { user } = this.props.auth;

    let matchContent;

    if (matches === null || loading || matches.length === 0) {
      matchContent = <Spinner />;
    } else {
      matchContent = (
        <React.Fragment>
            <div className="counter">Liczba meczów: {matches.length}</div>
            <MatchFeed matches={matches} />
        </React.Fragment>
      )
    }

    const addMatchButton = Administrators.includes(user.name) ? (
        <button
        type="button"
        className="btn btn-success mb-2"
        onClick={() => {
          this.setState({
            showMatchForm: !this.state.showMatchForm
          });
        }}
      >
        dodaj mecz
      </button>
    ) : null;

    const importMatchesButton = Administrators.includes(user.name) ? (
        <button
          type="button"
          className="btn btn-success mb-2"
          onClick={() => this.setState({
            showImportForm: !this.state.showImportForm
          })}
        >
          import
        </button>
    ) : null;

    const generateMatchFinalsButton = Administrators.includes(user.name) && (
      <button 
        type="button"
        className="btn btn-success mb-2"
        onClick={this.generateMatchFinals}
      >
        wygeneruj punktację
      </button>
    );

    return (
      <div className="feed matches-box">
        <Container>
          <div className="row">
            <div className="col-md-12">
              { addMatchButton }
              { importMatchesButton }
              { generateMatchFinalsButton }
              {this.state.showMatchForm && <MatchForm />}
              {this.state.showImportForm && <MatchImportForm />}
              {matchContent}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Matches.propTypes = {
  match: PropTypes.object.isRequired,
  getMatches: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  match: state.match,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMatches }
)(Matches);
