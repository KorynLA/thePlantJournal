import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./style/login.css"


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error=useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

async function handleSubmit(event) {
  event.preventDefault();

  try {
    await Auth.signIn(email, password);
    props.userHasAuthenticated(true);
    props.history.push('/');
  } catch (e) {
      alert(e.message);
  }
}

  return (
    <div className="Login">
      <Form className="formBox" onSubmit={handleSubmit}>
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          </Col>
        </Form.Group>
        <Button block bsSize="large" variant="primary" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </Form>
      {error}
    </div>
  );
}