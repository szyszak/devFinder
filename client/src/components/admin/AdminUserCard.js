import React, { Component } from "react";
import styled from "styled-components";

// STYLES

const UserCard = styled.li`
  margin: 16px;
`;

const Header = styled.h2`
  font-size: 14px;
`;

const Paragraph = styled.p``;

const Avatar = styled.img`
  display: block;
  width: 128px;
  height: auto;
`;

const RemoveBtn = styled.button`
  margin: 10px 0;
  padding: 6px 24px;
  background-color: #47a7ff;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
`;

// COMPONENT

class AdminUserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      _id,
      firstName,
      lastName,
      location,
      email,
      phone,
      bio,
      pic,
      // skills,
      createdAt,
      updatedAt
    } = this.props.user;

    return (
      <UserCard>
        <Avatar src={`/${pic}`} alt={`${firstName} ${lastName}`} />
        <Header>
          Full name: {firstName} {lastName}
        </Header>
        <RemoveBtn
          type="button"
          onClick={() => this.props.onRemove(_id, this.props.token)}
        >
          Remove user
        </RemoveBtn>
        <Paragraph>id: {_id}</Paragraph>
        <Paragraph>
          Location: {location.city}, {location.country}
        </Paragraph>
        <Paragraph>E-mail: {email}</Paragraph>
        <Paragraph>Phone: {phone}</Paragraph>
        <Paragraph>Bio: {bio}</Paragraph>
        <Paragraph>Pic: {pic}</Paragraph>
        <Paragraph>Created: {new Date(createdAt).toLocaleString()}</Paragraph>
        <Paragraph>Updated: {new Date(updatedAt).toLocaleString()}</Paragraph>
      </UserCard>
    );
  }
}

export default AdminUserCard;
