import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MatchFinals from "../matchFinals/MatchFinals";
import MatchLegend from "../matches/MatchLegend";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div className="dashboard-box container">
        <MatchLegend />
        <MatchFinals />
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
