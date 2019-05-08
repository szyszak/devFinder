import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUsers } from "../actions/actions";
import Skill from "./Skill";
import Spinner from "./Spinner";

// STYLES

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "pic info"
    "skills bio"
    "go-back hire";
  max-width: 1000px;
  margin: auto;
  padding-bottom: 60px;

  @media (max-width: 800px) {
    grid-template-columns: auto;
    grid-template-rows: repeat(6, auto);
    grid-template-areas:
      "pic"
      "info"
      "skills"
      "bio"
      "hire"
      "go-back";
  }
`;

const PicWrapper = styled.div`
  grid-area: pic;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Pic = styled.img`
  display: block;
  max-width: 340px;
  width: 100%;
  height: auto;
  border: solid 3px #00a7ff;
  border-radius: 50%;
`;

const InfoWrapper = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const InfoName = styled.h1`
  position: relative;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;

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

const InfoParagraph = styled.p`
  margin-bottom: 10px;
  font-size: 17px;
`;

const InfoLink = styled.a`
  color: #00a7ff;
`;

const SkillsWrapper = styled.div`
  grid-area: skills;
  max-width: 260px;
  margin: 30px auto 0 auto;
`;

const SkillsHeader = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

const BioWrapper = styled.div`
  grid-area: bio;
  padding: 30px;
`;

const BioHeader = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

const BioText = styled.p`
  font-size: 19px;
  text-indent: 20px;

  @media (max-width: 420px) {
    font-size: 17px;
  }
`;

const BtnBackWrapper = styled.div`
  grid-area: go-back;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnBack = styled(NavLink)`
  width: 120px;
  padding: 10px 0;
  background-color: #47a7ff;
  border: none;
  border-radius: 7px;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
`;

const BtnHireWrapper = styled.div`
  grid-area: hire;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnHire = styled.button`
  grid-area: hire;
  width: 120px;
  padding: 10px 0;
  background-color: #47a7ff;
  border: none;
  border-radius: 7px;
  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
`;

// COMPONENT

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.userData) this.props.onGetUsers();
  }

  render() {
    if (!this.props.userData) {
      return <Spinner />;
    } else {
      const {
        firstName,
        lastName,
        pic,
        location,
        phone,
        email,
        skills,
        bio
      } = this.props.userData;

      const skillList = skills.map(skill => (
        <Skill skill={skill} key={skill._id} />
      ));

      return (
        <Grid>
          <PicWrapper>
            <Pic src={`/${pic}`} alt={`${firstName} ${lastName}`} />
          </PicWrapper>

          <InfoWrapper>
            <InfoName>
              {firstName} {lastName}
            </InfoName>

            <InfoParagraph>
              Location: {location.city}, {location.country}
            </InfoParagraph>

            <InfoParagraph>
              E-mail: <InfoLink href={`mailto:${email}`}>{email}</InfoLink>
            </InfoParagraph>

            <InfoParagraph>
              Phone: <InfoLink href={`tel:${phone}`}>{phone}</InfoLink>
            </InfoParagraph>
          </InfoWrapper>

          <SkillsWrapper>
            <SkillsHeader>My Skills:</SkillsHeader>
            {skillList}
          </SkillsWrapper>

          <BioWrapper>
            <BioHeader>About me:</BioHeader>
            <BioText>{bio}</BioText>
          </BioWrapper>

          <BtnBackWrapper>
            <BtnBack to="/" exact>
              Go back
            </BtnBack>
          </BtnBackWrapper>

          <BtnHireWrapper>
            <BtnHire onClick={() => alert("App functionality ends here. :/")}>
              Hire me!
            </BtnHire>
          </BtnHireWrapper>
        </Grid>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.users.publicData.find(
      user => user._id === ownProps.match.params.id
    )
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
)(User);
