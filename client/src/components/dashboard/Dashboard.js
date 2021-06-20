import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MatchFinals from "../matchFinals/MatchFinals";
import MatchLegend from "../matches/MatchLegend";

import { Container } from "../../themes/basic";
import { getUsers } from "../../actions/userActions";

class Dashboard extends Component {
  componentDidMount() {
    const { getUsers } = this.props;
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/");
    }
    getUsers();
  }
  render() {
    return (
      <div className="dashboard-box">
        <Container>
            <MatchLegend />
            <MatchFinals />
        </Container>
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

export default connect(mapStateToProps, { getUsers })(Dashboard);
