# The Plant Journal
Allows users to add and update plant data
# Tools Used
  - [React](https://reactjs.org/)
  - [React Bootstrap](https://react-bootstrap.github.io/)
  - [React Router]
  - [Serverless Framework](https://www.serverless.com/)
  - AWS cloud services
    - [Cognito](https://aws.amazon.com/cognito/)
    - [DynamoDB](https://www.dynamodbguide.com/)
# Getting Started
## Prerequisites
   - Create an [AWS account](https://aws.amazon.com/account/)
## Installing 
   - Download [AWS CLI](https://aws.amazon.com/cli/)
     - Used to deploy and test the backend 
   - Download [NodeJS](https://nodejs.org/en/download/)
     - Used to run Frontend and install packages
   - Download [Serverless Framework](https://en.wikipedia.org/wiki/Serverless_Framework): npm install serverless -g
     - Used to support the API and Serverless functions without creating boiler code
## Configuring
   - Create an [IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)
      - Give them programmatic access and administrator access
      - [Learn](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) about IAM users and their functions
   - [Configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) the AWS CLI
   - Create a [DynamoDB table](https://aws.amazon.com/getting-started/hands-on/create-nosql-table/)
   - Create a [Cognito User Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html)
      - Cognito provides auhentication and authorization for the users that will be added to the application.
   - Create [Federeated Identity Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html)
     - Allows values inserted into DynamoDB to only be associated with that user
## Local Deployment
   - Backend
      - Run: npm install
      - Run: serverless deploy
   - Frontend
     - Update config.js
       - API Gateway values are found when deploying the backend
       - Cognito values are found in the Cognito dashboard
     - Run: npm install
     - Run: npm start
# Project Structure
## Backend
   - Uses serverless infrastructure
## Frontend
