/***
Backend REST file to delete a plant entry in dynamoDB using the plant ID
Uses "delete" call from dynamoDB
***/
import * as dynamoDbLib from "./libs/dynamo-libs";
import { success, failure } from "./libs/response-libs";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      plantId: event.pathParameters.id
    }
  };

  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}