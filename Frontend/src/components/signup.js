import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./style/signup.css";

/***
Uses React hooks to create signup for user 
***/
export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [displayModal, setDisplayModal]=useState(true);

/***
Validates that user entered a usable email / password. If not, the user cannot submit the 
form
***/
  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

/***
Validates that user entered a usable code when submitting needed code after profile creation
If not, the user cannot submit the code
***/
  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

/***
Calls AWS SDK to create a new user profile. Sets the user for the rest of the routes
so user does not need to log back in.
***/
async function handleSubmit(event) {
  event.preventDefault();


  try {
    const newUser = await Auth.signUp({
      username: email,
      password: password
    });
    setNewUser(newUser);
  } catch (e) {
      alert(e.message);

  }
}

/***
Calls AWS SDK to create log a user in. If there is a profile associated with a user
they will be logged in and sent to gome. Else there will be an error message.
***/
async function handleConfirmationSubmit(event) {
  event.preventDefault();


  try {
    await Auth.confirmSignUp(email, confirmationCode);
    await Auth.signIn(email, password);

    props.userHasAuthenticated(true);
    props.history.push("/");
  } catch (e) {
      alert(e.message);
  }
}

/***
Form to enter confirmation code sent to user via email.
***/
  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" bsSize="large">
          <Form.Control
            autoFocus
            type="tel"
            value={confirmationCode}
            onChange={e => setConfirmationCode(e.target.value)}
          />
          <Form.Text>Please check your email for the code.</Form.Text>
        </Form.Group>
        <Button
          block
          type="submit"
          bsSize="large"
          disabled={!validateConfirmationForm()}
        >
          Verify
        </Button>
      </form>
    );
  }

/***
Form for user to create an account with the PlantJournal service.
***/
  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="email" bsSize="large">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="password" bsSize="large">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="confirmPassword" bsSize="large">
          <Form.Label column sm={2}>Confirm Password</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button
          block
          type="submit"
          bsSize="large"
          disabled={!validateForm()}
        >
          Signup
        </Button>
                <Form.Text>Password must have more than 8 characters, a number, symbol, uppercase, and lowercase letter.</Form.Text>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}