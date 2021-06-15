import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MatchFinalFeed from "./MatchFinalFeed";
import Spinner from "../common/spinner";
import { getMatchFinals } from "../../actions/matchFinalActions";
import { getMatches } from "../../actions/matchActions";

import ModalDialog from "../common/ModalDialog/components/ModalDialog";
import MatchFinalStatistic from "./MatchFinalStatistic";

class MatchFinals extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: false
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/");
    }
    this.props.getMatchFinals();
    this.props.getMatches();
  }

  render() {
    const { showModal } = this.state;
    const { matchFinals, loading } = this.props.matchFinal;
    const { matches } = this.props.match;

    let matchFinalContent;

    if (
      matchFinals === null ||
      loading ||
      matchFinals.length === 0 ||
      matches === null ||
      matches.length === 0
    ) {
      matchFinalContent = <Spinner />;
    } else {

      matchFinalContent = (
        <MatchFinalFeed matches={matches} matchFinals={matchFinals} />
      );
    }
    return (
      <React.Fragment>
        { showModal && 
          (
            <ModalDialog
              width="800px"
              closeHandler={() => { this.setState({ showModal: false })}}
            >
                <MatchFinalStatistic matchFinals={matchFinals} />
            </ModalDialog>
          )
        }
        <button className="btn btn-success mb-2 float-right" onClick={() => { this.setState({ showModal: true }) }}>
          Ranking zakładów
        </button>
        <div className="feed match-finals-box">{matchFinalContent}</div>
      </React.Fragment>

    )
  }
}

MatchFinals.propTypes = {
  matchFinal: PropTypes.object.isRequired,
  getMatchFinals: PropTypes.func.isRequired,
  getMatches: PropTypes.func.isRequired,
  // matches: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  matchFinal: state.matchFinal,
  match: state.match,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMatchFinals, getMatches }
)(MatchFinals);
