import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";
import Routes from "./routes";
import './style/plantCount.css';
import { Auth } from 'aws-amplify';

/***
Main file all other components are loaded through if user is logged in
***/
function PlantCount(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

//function  that loads if the user is logged in
async function onLoad() {
  try {
    //calls the current session if there is one
    await Auth.currentSession();
    userHasAuthenticated(true);
  }
  catch(e) {
    if (e !== 'No current user') {
      alert(e);
    }
  }
  setIsAuthenticating(false);
}
 
//function to log user out and send them back to the login page
async function handleLogout() {
  await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }
  return (
    !isAuthenticating &&
    <div className="plantContainer">
      <Navbar>
        <Navbar.Brand href="/">The Plant Journal</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            {isAuthenticated 
            ? (<>
              <NavDropdown title="Menu" id="collasible-nav-dropdown">
                 <NavDropdown.Item href="/plants">Your Plants</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
              </>
            ) : ( 
              <>
              <NavDropdown title="Menu" id="collasible-nav-dropdown">
                 <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
              </NavDropdown>
              </>
            )}
        </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(PlantCount);