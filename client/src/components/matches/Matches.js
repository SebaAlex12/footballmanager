import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import Styled from "styled-components";

import MatchForm from "./MatchForm";
import MatchFeed from "./MatchFeed";
import Spinner from "../common/spinner";

import { Container } from "../../themes/basic";
import Administrators from "../../Admin";

import MatchImportForm from "./MatchImportForm";
import MatchesFilter from "./MatchesFilter";

class Matches extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      matchesTypes:{
          toPlay: true,
          inProgress: true,
          finished: false
      },
      filteredMatches: [],
      showMatchForm: false,
      showImportForm: false
    };
  }
  componentDidMount = async() => {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/");
    }
    const { matches } = this.props.match;
    if(matches.length > 0){
      this.setState({
        filteredMatches: matches
      })
    }
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

  matchesTypesAction = (matchesTypes) => {
    this.setState({
      matchesTypes: matchesTypes
    })
  }

  render() {
    let { filteredMatches, matchesTypes } = this.state;
    const { loading, matches } = this.props.match;
    const { user } = this.props.auth;

    // console.log("state",this.state);
    if(matches && matches.length > 0){
      filteredMatches = matches.filter(match => {
        const currentTime = moment(new Date(),"YYYY-MM-DD HH:mm:ss").format();
        const shiftTime = moment(new Date(),"YYYY-MM-DD HH:mm:ss").add(110, 'minutes').format();
  
        // console.log("currentTime", currentTime);
        // console.log("shift time",shiftTime);
        // console.log("match date", match.date);
        // console.log("diff",currentTime.diff(match.date, 'minutes'));
        // show matches not yet started
        if(matchesTypes.toPlay && ( match.date > currentTime )){
          return match;
        } 
        // show matches in progress
        if(matchesTypes.inProgress && ( match.date >= shiftTime)){
          return match;
        }
        // show matches finished
        if(matchesTypes.finished  && ( match.date < shiftTime)){
          return match;
        }
      });
    }

    let matchContent;

    if (filteredMatches === null || loading || filteredMatches.length === 0) {
      matchContent = <Spinner />;
    } else {
      matchContent = (
        <React.Fragment>
            <div className="counter">Liczba meczów: {filteredMatches.length}</div>
            <MatchFeed matches={filteredMatches} />
        </React.Fragment>
      )
    }

    const addMatchButton = Administrators.includes(user.email) ? (
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

    const importMatchesButton = Administrators.includes(user.email) ? (
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

    const generateMatchFinalsButton = Administrators.includes(user.email) && (
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
              <AdminNavigatorBox>
                  { addMatchButton }
                  { importMatchesButton }
                  { generateMatchFinalsButton }
              </AdminNavigatorBox>
              {this.state.showMatchForm && <MatchForm />}
              {this.state.showImportForm && <MatchImportForm />}
              <NavigatorBox>
                  <button className="btn btn-green" onClick={() => {
                        const { matches } = this.props.match;
                        if(matches.length > 0){
                          this.setState({
                            matches: matches,
                            filteredMatches: matches
                          })
                        }
                  }}>Odśwież</button>
                  <div className="filter-box">
                      <MatchesFilter matchesTypesActionHandler={this.matchesTypesAction} matchesTypes={matchesTypes} />
                  </div>
              </NavigatorBox>
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  match: state.match,
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Matches);

const AdminNavigatorBox = Styled.nav`
  display:flex;
`;

const NavigatorBox = Styled.nav`
  display:flex;
  justify-content: flex-end;
`;