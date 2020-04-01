import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Amplify from 'aws-amplify';
import config from './config';
import PlantCount from "./components/PlantCount";
/***
Configures connection to database endpoints
***/
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "plantjournal",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});
/***
Uses react router to find page to dynamically load.
Page is loaded into PlantCount
***/
render(		
	<Router>
		<PlantCount />
	</Router>, 
	document.getElementById('content')
);
