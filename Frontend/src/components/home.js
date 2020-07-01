import React from 'react';
import "./style/Home.css";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Image } from "react-bootstrap";
import succulent from "./style/succulent9.jpg";

export default function Home(props) {

  function renderLander() {
    return (
		<div className="homeContainer">
			<p>Watch them grow</p>
  			<div className="well">
  				<LinkContainer to="/signup">
              		<Button block bsSize="large">Signup</Button>
            	</LinkContainer>
            	<LinkContainer to="/login">
           			<Button block bsSize="large">Login</Button>
           		</LinkContainer>
  			</div>
		</div>
    );
  }

  function renderNotes() {
    return (
      <div className="plantNotes">
        <Image className="plant" src={ succulent } responsive rounded/>
      	<h1 className="homeHeader">Watch them grow</h1>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
