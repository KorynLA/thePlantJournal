/***
Backend REST file to create a new plant entry in dynamoDB
Uses "put" call from dynamoDB
***/
import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamo-libs";
import { success, failure } from "./libs/response-libs";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "plantData",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      plantId: uuid.v1(),
      content: data.content,
      nameP: data.nameP,
      typeP: data.typeP,
      sunlight: data.sunlight,
      water: data.water,
      birthday: data.birthday,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    console.log("called create");
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}