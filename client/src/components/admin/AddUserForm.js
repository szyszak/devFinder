import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import styled from "styled-components";

import FileInput from "./FileInput";
import SkillList from "./SkillList";

// STYLES

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 320px;
  margin: auto;
  margin-top: 20px;
  padding: 0 10px;
`;

const Header = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.label``;

const Input = styled(Field)`
  width: 100%;
  max-width: 220px;
  padding: 3px;
`;

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SkillInputWrapper = styled.div``;

const Paragraph = styled.p`
  margin: 10px 0;
`;

const SubmitBtn = styled.button`
  padding: 10px 30px;
  background-color: #47a7ff;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

// COMPONENT

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Header>Add new user:</Header>

        <InputWrapper>
          <Label htmlFor="firstName">First name:</Label>
          <Input name="firstName" type="text" component="input" />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="lastName">Last name:</Label>
          <Input name="lastName" type="text" component="input" />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="email">E-mail:</Label>
          <Input name="email" type="email" component="input" />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="phone">Phone:</Label>
          <Input name="phone" type="number" component="input" />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="country">Country:</Label>
          <Input name="location.country" type="text" component="input" />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="city">City:</Label>
          <Input name="location.city" type="text" component="input" />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="pic">Picture:</Label>
          <Field name="pic" type="file" component={FileInput} />
        </InputWrapper>

        <TextareaWrapper>
          <Label htmlFor="bio">Bio:</Label>
          <Field name="bio" component="textarea" />
        </TextareaWrapper>

        <SkillInputWrapper>
          <Paragraph>Skills:</Paragraph>
          <FieldArray name="skills" component={SkillList} />
        </SkillInputWrapper>

        <InputWrapper>
          <Label htmlFor="active">Active:</Label>
          <Field name="active" type="checkbox" component="input" />
        </InputWrapper>

        <SubmitBtn type="submit">SEND</SubmitBtn>
      </Form>
    );
  }
}

export default reduxForm({ form: "addUserForm" })(AddUserForm);
