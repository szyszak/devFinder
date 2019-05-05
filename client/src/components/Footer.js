import React from "react";
import styled from "styled-components";

// STYLES

const StyledFooter = styled.footer`
  margin-top: auto;
  padding: 10px;
  background-color: #00a7ff;
  color: #ffffff;
  text-align: center;
`;

// COMPONENT

const Footer = () => (
  <StyledFooter>
    <h3>devFinder</h3>
  </StyledFooter>
);

export default Footer;
