import React, { Component } from "react";
import { Field } from "redux-form";
import styled from "styled-components";

// STYLES

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  width: 270px;
  padding-top: 10px;
  border-top: solid 1px #000000;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const Button = styled.button`
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

const SkillField = ({ input, label, type }) => (
  <InputWrapper>
    <label>{label}</label>
    <input {...input} type={type} />
  </InputWrapper>
);

class SkillList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fields.push();
  }

  render() {
    const fields = this.props.fields;

    return (
      <>
        <Button type="button" onClick={() => fields.push()}>
          Add more
        </Button>

        <List>
          {fields.map((skill, index) => (
            <ListItem key={index}>
              <Field
                name={`${skill}.skillName`}
                label="Skill name:"
                type="text"
                component={SkillField}
              />

              <Field
                name={`${skill}.skillLevel`}
                type="number"
                label="Skill level:"
                component={SkillField}
              />

              <Button type="button" onClick={() => fields.remove(index)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

export default SkillList;
