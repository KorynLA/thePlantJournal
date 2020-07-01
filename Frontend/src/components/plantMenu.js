import React, {useState, useEffect} from 'react';
import "./style/plantMenu.css";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Image, CardColumns, Card } from "react-bootstrap";
import { API } from "aws-amplify";
import succulent from "./style/succulent2.jpg"
import renderLander from "./renderLander.js"
/***
Function that loads plants if user is logged in
***/
export default function View(props) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
  async function onLoad() {
    if (!props.isAuthenticated) {
      return;
    }

    try {
      const plants = await loadPlants();
      setPlants(plants);
    } catch (e) {
      alert(e);
    }
  }

  onLoad();
}, [props.isAuthenticated]);

  /***
  Uses aws-amplify to retrieve plant information
  ***/
  function loadPlants() {
    return API.get("plantjournal", "/journal");
  }

  /***
  Function to render the plants if the user is logged in
  ***/
  function renderNotesList(plants) {
    return [{}].concat(plants).map((plant, i) =>
      i !== 0 ? (
          <Card style={{ width: '18rem' }} className="plantList">
            <LinkContainer key={plant.plantId} to={`/plants/${plant.plantId}`}>
            <Card.Body>
              <Card.Header as="h1">{plant.nameP}</Card.Header>
              <Card.Text className="plantInfo1">{plant.typeP.split("\n")[0]}</Card.Text>
              <Card.Text> {plant.water.slice(5).replace('-','/')} </Card.Text>
            </Card.Body>
            </LinkContainer>
          </Card>
      ) : ( 
        <br></br>
      )
    );
  }

  function renderNotes() {
    return (
      <div className="plants1">
        <Image src={succulent} className="sucImage"/>
        <div className="plantOverlay">
          <h1>Your Plants</h1>
          <LinkContainer key="new" to="/add">
            <Button block size="lg"> Add Plant </Button>
          </LinkContainer>

          <CardColumns>
            {renderNotesList(plants)}
          </CardColumns>
        </div>
      </div>
    );
  }

  return (
    <div className="plantMenu">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
