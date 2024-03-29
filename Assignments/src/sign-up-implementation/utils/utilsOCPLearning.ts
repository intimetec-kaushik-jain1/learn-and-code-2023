import { MongoClient } from "mongodb";
import { UserRequest } from "./Interfaces";
import { RESPONSE_MESSAGE } from "./constants";

interface DBConnection {
  setConnection(): Promise<void>;
  getCollection(): any;
  isUserAlreadyExist(user: UserRequest): Promise<any>;
}

// MongoDB Implementation
class MongoDBConnection implements DBConnection {
  private client: MongoClient | null = null;

  async setConnection(): Promise<void> {
    try {
      console.log("setConnection");
      this.client = new MongoClient(
        "mongodb+srv://kaushikjain1111:Pyan5VPslEbogYBo@signupapi.b4iwoxe.mongodb.net/"
      );
      await this.client.connect();
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  async getCollection(): Promise<any> {
    try {
      console.log("getCollection");
      await this.setConnection();

      const database = this.client?.db("user");
      const collection = database?.collection("users");
      return collection;
    } catch (error) {
      console.error("Error getting collection:", error);
      throw error;
    }
  }

  async isUserAlreadyExist(user: UserRequest): Promise<any> {
    try {
      console.log("isUserAlreadyExist");
      const collection = await this.getCollection();
      const existingUser = await collection.findOne({ email: user.email });
      console.log("existingUser : ", existingUser);
      return existingUser;
    } catch (error) {
      console.error(RESPONSE_MESSAGE.errorFindingUser, ":", error);
      return false;
    }
  }
}

// MySQL Implementation (for future use)
class MySQLDBConnection implements DBConnection {
  async setConnection(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getCollection(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async isUserAlreadyExist(user: UserRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

// Function to initialize and return the appropriate DBConnection instance
export async function getDBConnection(): Promise<DBConnection> {
  const mongoDBConnection = new MongoDBConnection();
  return mongoDBConnection;
}
