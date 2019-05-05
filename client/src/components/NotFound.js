import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  margin-top: 150px;
`;

const NotFound = () => (
  <Wrapper>
    <Header>404 NOT FOUND</Header>
  </Wrapper>
);

export default NotFound;
