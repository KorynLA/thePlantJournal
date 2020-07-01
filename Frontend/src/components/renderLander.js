import React from 'react';
import { Button, ButtonToolbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./style/Home.css";
export default function renderLander() {
  return (
    <div className="homeContainer">
      <p>Watch them grow</p>
      <div className="buttonContainer">
        <ButtonToolbar>
          <LinkContainer to="/signup">
            <Button variant="primary" size="lg" block>Signup</Button>
          </LinkContainer>
          <LinkContainer to="/login">
            <Button variant="primary" size="lg" block>Login</Button>
          </LinkContainer>
        </ButtonToolbar>
        </div>
    </div>
  );
}