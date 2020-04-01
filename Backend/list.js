/***
Backend REST file to return the verified user's plant entries in dynamoDB
Uses "get" call from dynamoDB
***/
import * as dynamoDbLib from "./libs/dynamo-libs";
import { success, failure } from "./libs/response-libs";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    //Only return entry if the userId matches the user - query condition
    KeyConditionExpression: "userId = :userId",
    //define the userId attribute to be the user logged in
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}