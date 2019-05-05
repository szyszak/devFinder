import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../actions/actions";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import logoBig from "../assets/logo_big.png";

// STYLES

const StyledHeader = styled.header`
  padding: 20px;
  background-color: #00a7ff;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  display: block;
  height: 40px;
  width: auto;

  @media (max-width: 420px) {
    height: 30px;
  }
`;

const List = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 500px) {
    display: none;
  }
`;

const ListItem = styled.li`
  margin-left: 15px;
`;

const StyledNavLink = styled(NavLink)`
  color: #ffffff;
  font-weight: bold;

  /* &.active {
    color: #ffbb33;
  } */
`;

// COMPONENT
class Header extends Component {
  render() {
    // const isAuthenticated = this.props.isAuthenticated;

    return (
      <StyledHeader>
        <Nav>
          <Link to="/">
            <Logo src={logoBig} alt="devFinder" />
          </Link>

          <List>
            <ListItem>
              <StyledNavLink to="/" exact>
                Home
              </StyledNavLink>
            </ListItem>

            {/* {!isAuthenticated && (
              <ListItem>
                <StyledNavLink to="/login" exact>
                  Log in
                </StyledNavLink>
              </ListItem>
            )}

            {isAuthenticated && (
              <ListItem>
                <StyledNavLink to="/admin/" exact>
                  Admin
                </StyledNavLink>
              </ListItem>
            )} */}
          </List>
        </Nav>
      </StyledHeader>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(logOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
