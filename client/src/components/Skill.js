import React, { Component } from "react";
import styled from "styled-components";

// STYLES

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkillName = styled.p`
  font-weight: bold;
`;

const DotsWrapper = styled.div`
  display: flex;
  padding: 10px;
`;

const SkillDot = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 6px;
  border: 1px solid #000000;
  border-radius: 50%;

  &.filled {
    background-color: #ff5959;
  }
`;

// COMPONENT

class Skill extends Component {
  renderDots = skillLevel => {
    const skillDots = [];

    for (let i = 0; i < 5; i++) {
      i < skillLevel
        ? skillDots.push(<SkillDot key={i} className="filled" />)
        : skillDots.push(<SkillDot key={i} />);
    }

    return skillDots;
  };

  render() {
    const { skillName, skillLevel } = this.props.skill;

    return (
      <Wrapper>
        <SkillName>{skillName}: </SkillName>
        <DotsWrapper>{this.renderDots(skillLevel)}</DotsWrapper>
      </Wrapper>
    );
  }
}

export default Skill;
