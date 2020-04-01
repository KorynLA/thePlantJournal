/***
Backend REST file to update a plant entry in dynamoDB
Uses "update" call from dynamoDB
***/
import * as dynamoDbLib from "./libs/dynamo-libs";
import { success, failure } from "./libs/response-libs";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      plantId: event.pathParameters.id
    },
    //sets content to be updated, only supports multiline in ES5
    UpdateExpression: "SET content =:content, attachment =:attachment, birthday =:birthday, typeP =:typeP, nameP =:nameP, water =:water, sunlight =:sunlight",
    //sets values of the content to be updated
    ExpressionAttributeValues: {
      ":content": data.content || null,
      ":attachment": data.attachment || null,
      ":sunlight": data.sunlight || null,
      ":water": data.water || null,
      ":nameP": data.nameP || null,
      ":typeP": data.typeP || null,
      ":birthday": data.birthday || null
    },
    //returns all attributes of the plant entry
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}