import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getUsers } from "../actions/actions";

import SearchForm from "./SearchForm";
import UserCard from "./UserCard";
import Spinner from "./Spinner";

// STYLES

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
  background-color: #ffffff;
`;

const MainHeader = styled.h1`
  margin: 30px 0;
  text-align: center;
`;

const NoResults = styled.h2`
  margin-top: 50px;
`;

// COMPONENT

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      gotUserData: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.gotUserData && nextProps.publicData.length !== 0) {
      return {
        users: nextProps.publicData,
        gotUserData: true
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.props.onGetUsers();
  }

  onSubmit = values => {
    const countryRegex = new RegExp(values.country, "i");
    const skillRegex = new RegExp(values.skill, "i");

    const filteredUsers = this.props.publicData.filter(user => {
      return (
        countryRegex.test(user.location.country) &&
        user.skills.some(skill => {
          if (!values.skill) return true;

          return skillRegex.test(skill.skillName);
        })
      );
    });

    this.setState({
      users: filteredUsers
    });
  };

  renderUserCards = () => {
    if (!this.state.gotUserData) return <Spinner />;

    if (this.state.users.length === 0) {
      return <NoResults>No results found.</NoResults>;
    }

    const userCards = this.state.users.map(user => {
      return <UserCard user={user} key={user._id} />;
    });

    return userCards;
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <MainHeader>Our developers:</MainHeader>
        <Wrapper>{this.renderUserCards()}</Wrapper>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    publicData: state.users.publicData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUsers: () => dispatch(getUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
