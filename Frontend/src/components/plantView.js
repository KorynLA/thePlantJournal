import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Form, Button, Col, Row, ButtonGroup } from "react-bootstrap";
import config from "../config";
import "./style/plantView.css";

export default function PlantView(props) {
  const [plant, setPlant]= useState(false);
  const [content, setContent] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [water, setWater] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nameP, setNameP] = useState("");
  const [typeP, setTypeP] = useState("");
  const [alive, setAlive] = useState("true");

/***
Calls aws-amplify framework to retrieve data for UI
***/
  useEffect(() => {
    //load plant data using the get API created
    function loadPlant() {
      return API.get("plantjournal", `/journal/${props.match.params.id}`);
    }
    /***
    Async function to wait entries found and set the corresponding variables to the
    retrieved values
    ***/
    async function onLoad() {
      try {
        const plant = await loadPlant();
        const { content, water, sunlight, nameP, birthday, typeP, alive } = plant;

        //update all of the plant data retrieved from GET request
        setContent(content);
        setNameP(nameP);
        setTypeP(typeP);
        setBirthday(birthday);
        setWater(water);
        setSunlight(sunlight);
        setPlant(true);
        setAlive(alive);
        console.log(nameP);

      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

/***
Validates that the form content has values in it to update
***/
function validateForm() {
  return content.length > 0;
}

/***
Calls AWS-amplify to update an entry
***/
function savePlant(plant) {
  console.log(plant);
  return API.put("plantjournal", `/journal/${props.match.params.id}`, {
    body: plant
  });
}

/***
Update plant information
***/
async function handleSubmit(event) {

  event.preventDefault();
  try {
    await savePlant({
      nameP,
      typeP,
      sunlight,
      water,
      birthday,
      content,
      alive
    });
    props.history.push("/plants");
  } 
  catch (e) {
    alert(e);
  }
}

/***
Uses aws-amplify delete function to remove plant
***/
function deletePlant() {
  return API.del("plantjournal", `/journal/${props.match.params.id}`);
}

/***
Function to confirm plant deletion awaits deletion and sends user back to plant homepage
***/
async function handleDelete(event) {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this plant?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deletePlant();
    props.history.push("/plants");
  } catch (e) {
    alert(e);
  }
}

return (
  <div className="plants">
    {plant && (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="nameP">
          <Form.Label column sm={2}>Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              value={nameP}
              onChange={e => setNameP(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="typeP">
          <Form.Label column sm={2}>Type</Form.Label>
          <Col sm={10}>        
            <Form.Control
              value={typeP}
              onChange={e => setTypeP(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="birthday">
          <Form.Label column sm={2}>Birthday</Form.Label>
          <Col sm={10}>
            <Form.Control
              value={birthday}
              type="date"
              onChange={e => setBirthday(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="sunlight">
          <Form.Label column sm={2}>Sunlight</Form.Label>
          <Col sm={10}>
            <Form.Control
              value={sunlight}
              onChange={e => setSunlight(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="water">
          <Form.Label column sm={2}>Water</Form.Label>
          <Col sm={10}>
            <Form.Control
              value={water}
              type="date"
              onChange={e => setWater(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="content">
          <Form.Label column sm={2}>Other Notes</Form.Label>
          <Col sm={10}>
            <Form.Control
              value={content}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </Col>
        </Form.Group>
        )}
        <ButtonGroup>
        <br></br>
        <Button
          type="submit"
          bsSize="lg"
          bsStyle="default"
          disabled={!validateForm()}
        >
          Save
        </Button>
        <Button
          bsSize="lg"
          bsStyle="default"
          onClick={handleDelete}
        >
          Delete
        </Button>
        </ButtonGroup>
      </Form>
    )}
  </div>
);
}

//{props.isAuthenticated ? renderNotes() : renderLander()}