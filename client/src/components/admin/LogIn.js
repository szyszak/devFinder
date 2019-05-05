import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logIn } from "../../actions/actions";
import LogInForm from "./LogInForm";

// STYLES

const MainHeader = styled.h1`
  margin: 30px 0;
  text-align: center;
`;

// COMPONENT

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/admin");
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/admin");
    }
  }

  render() {
    return (
      <>
        <MainHeader>Please log in:</MainHeader>
        <LogInForm onSubmit={this.props.onSubmit} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    history: state.history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => dispatch(logIn(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LogIn));
