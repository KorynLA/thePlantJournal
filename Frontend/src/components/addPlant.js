import React, { useRef, useState } from "react";
import { Jumbotron, Form, Col, Button, ButtonToolbar} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import config from "../config";
import "./style/addPlant.css";
//needed to connect to backend AWS database
import { API } from "aws-amplify";

/***
Function to create a new entry
***/
function AddPlant(props) {
    const [content, setContent] = useState("");
    const [sunlight, setSunlight] = useState("");
    const [water, setWater] = useState("");
    const [birthday, setBirthday] = useState("");
    const [nameP, setName] = useState("");
    const [typeP, setType] = useState("");
    const [alive, setAlive] = useState("true");
    
    function createPlant(plant) {
        console.log(plant);
        return API.post("plantjournal", "/journal", {
            body: plant
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await createPlant({ nameP, typeP, birthday, sunlight, water, content, alive });
            props.history.push('/plants');
        } catch (e) {
            alert(e);
        }
    }
    function renderAdd() {
        return (
        <div className="AddPage">
            <Jumbotron className="addJumbo">
                <h1> Add </h1>
            </Jumbotron>
            <div className="NewPlant">
                <Form horizontal="true" onSubmit={ handleSubmit }>
                    <Form.Group controlId="nameP">
                        <Col sm={2}>Name</Col>
                        <Col sm={10}>
                            <Form.Control className="addBottom" value={nameP} type="text" placeholder="Bob" onChange={e => setName(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="typeP">
                        <Col sm={2}>Type</Col>
                        <Col sm={10}>
                            <Form.Control className="addBottom" value={typeP} type="text" placeholder="Aloe Vera" onChange={e => setType(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="birthday">
                        <Col sm={2}>Birthday</Col>
                        <Col sm={10}>
                            <Form.Control className="addBottom" value={birthday} type="date" onChange={e => setBirthday(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="sunlight">
                        <Col sm={2}>Sunlight</Col>
                        <Col sm={10}>
                            <Form.Control className="addBottom" value={sunlight} type="text" placeholder="Medium" onChange={e => setSunlight(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="water">
                        <Col sm={2}>Last Watered</Col>
                        <Col sm={10}>
                            <Form.Control className="addBottom" value={water} type="date" placeholder="Low" onChange={e => setWater(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="content">
                        <Col sm={2}>Other Notes</Col>
                        <Col sm={10}>
                            <Form.Control className="addBottom" value={content} type="text" placeholder="Doesn't like cold" onChange={e => setContent(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Button block className="addButton" size="lg" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
        );
    }
    function renderLander() {
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
    return (
        <div className="plantAdd">
            {props.isAuthenticated ? renderAdd() : renderLander()}
        </div>
    );
}

export default AddPlant;