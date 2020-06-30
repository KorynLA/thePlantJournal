# The Plant Journal
Allows users to add and update plant data
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
## Local Deployment'
   - Backend
      - Run: npm install
      - Run: serverless deploy
   - Frontend
     - Run: npm install
     - Run: npm start
# Tools Used
