import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Skill from "./Skill";

// STYLES

const Card = styled.div`
  width: 280px;
  height: 460px;
  margin: 100px 20px 30px 20px;
  padding: 30px;
  padding-top: 100px;
  position: relative;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
`;

const Avatar = styled.img`
  display: block;
  width: 160px;
  height: auto;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translate(-50%);
  border: 3px solid #73bcff;
  border-radius: 50%;
`;

const Name = styled.p`
  margin-bottom: 24px;
  position: relative;
  font-size: 24px;

  &::after {
    content: "";
    width: 60px;
    height: 2px;
    position: absolute;
    bottom: -14px;
    left: 50%;
    transform: translate(-50%);
    background-color: black;
  }
`;

const Location = styled.p`
  margin-bottom: 12px;
  font-size: 18px;
  color: #646464;
`;

const More = styled.p`
  margin-top: 10px;
  font-size: 17px;
`;

const Button = styled(Link)`
  width: 200px;
  display: inline-block;
  padding: 10px 0;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
  background-color: #47a7ff;
  border-radius: 7px;
  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
`;

// COMPONENT

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.MAX_SKILLS = 4;
  }

  renderSkills = skills => {
    const skillList = [];

    for (let i = 0; i < skills.length; i++) {
      if (i < this.MAX_SKILLS) {
        skillList.push(<Skill skill={skills[i]} key={skills[i]._id} />);
      } else {
        break;
      }
    }

    if (skills.length > this.MAX_SKILLS)
      skillList.push(<More key="0">...and more!</More>);

    return skillList;
  };

  render() {
    const { firstName, lastName, location, skills, pic, _id } = this.props.user;

    return (
      <Card>
        <Avatar src={`/${pic}`} alt={`${firstName} ${lastName}`} />

        <Name>
          {firstName} {lastName}
        </Name>

        <Location>
          {location.city}, {location.country}
        </Location>

        {this.renderSkills(skills)}

        <Button to={`/user/${_id}`}>SEE DETAILS</Button>
      </Card>
    );
  }
}

export default UserCard;
