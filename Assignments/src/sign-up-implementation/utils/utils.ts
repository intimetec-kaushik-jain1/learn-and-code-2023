import { MongoClient } from "mongodb";
import { UserRequest } from "./Interfaces";
import { RESPONSE_MESSAGE } from "./constants";

export async function setDBConnection() {
  const client = new MongoClient(
    "mongodb+srv://kaushikjain1111:Pyan5VPslEbogYBo@signupapi.b4iwoxe.mongodb.net/"
  );
  await client.connect();
  return client;
}

export async function getCollection() {
  const client = await setDBConnection();
  const database = client.db("user");
  const collection = database.collection("users");
  return collection;
}

export async function isUserAlreadyExist(user: UserRequest) {
  const client = await setDBConnection();
  const database = client.db("user");
  const collection = database.collection("users");

  try {
    const existingUser = await collection.findOne({ email: user.email });
    return existingUser;
  } catch (error) {
    console.error(RESPONSE_MESSAGE.errorFindingUser, ":", error);
    return false;
  } finally {
    await client.close();
  }
}
