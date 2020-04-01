/***
Calls the AWS SDK to perform dynamoDB action and returns the result
***/
import AWS from "aws-sdk";

//Time location of database
AWS.config.update({ region: "us-east-1" });

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
