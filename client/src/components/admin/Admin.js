import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsersAdmin, addUser, removeUser } from "../../actions/actions";
import AdminUserCard from "./AdminUserCard";
import AddUserForm from "./AddUserForm";

// STYLES

const MainHeader = styled.h1`
  margin-top: 30px;
  text-align: center;
`;

const SubHeader = styled.h2`
  margin-top: 30px;
  text-align: center;
`;

const UsersList = styled.ul`
  list-style: none;
`;

// COMPONENT

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.onGetUsers(this.props.token);
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    const listItems = this.props.adminData.map(user => {
      return (
        <AdminUserCard
          user={user}
          key={user._id}
          onRemove={this.props.onRemove}
          token={this.props.token}
        />
      );
    });

    return (
      <>
        <MainHeader>Welcome, {this.props.login}</MainHeader>
        <AddUserForm
          onSubmit={values => this.props.onSubmit(values, this.props.token)}
        />

        <SubHeader>User list:</SubHeader>
        <UsersList>
          {listItems.length > 0 ? listItems : <h2>No users added</h2>}
        </UsersList>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminData: state.users.adminData,
    isAuthenticated: state.auth.isAuthenticated,
    login: state.auth.login,
    token: state.auth.token,
    history: state.history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUsers: token => dispatch(getUsersAdmin(token)),
    onSubmit: (values, token) => dispatch(addUser(values, token)),
    onRemove: (userId, token) => dispatch(removeUser(userId, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Admin));
