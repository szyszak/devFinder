import React from "react";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";

// STYLES

const Form = styled.form`
  padding: 20px;
  background-color: #f5f5f5;
`;

const Header = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-right: 6px;
  font-size: 16px;
`;

const Input = styled(Field)`
  padding: 3px;
`;

const SubmitButton = styled.button`
  padding: 10px 30px;
  background-color: #47a7ff;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

// COMPONENT

const SearchForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Header>Filter developers:</Header>
    <InputWrapper>
      <Label htmlFor="country">Country:</Label>
      <Input name="country" type="text" component="input" />
    </InputWrapper>
    <InputWrapper>
      <Label htmlFor="skill">Skill:</Label>
      <Input name="skill" type="text" component="input" />
    </InputWrapper>
    <SubmitButton type="submit">SUBMIT</SubmitButton>
  </Form>
);

export default reduxForm({ form: "searchForm" })(SearchForm);
