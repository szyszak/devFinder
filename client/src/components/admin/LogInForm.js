import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";

// STYLES

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 260px;
  margin: auto;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled(Field)`
  padding: 3px;
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

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="login">Login:</Label>
          <Input name="login" type="text" component="input" />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">Password:</Label>
          <Input name="password" type="password" component="input" />
        </InputWrapper>

        <SubmitBtn type="submit">LOG IN</SubmitBtn>
      </Form>
    );
  }
}

export default reduxForm({ form: "logInForm" })(LogIn);
