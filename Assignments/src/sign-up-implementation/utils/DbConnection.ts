import { Collection, ConnectOptions, Db, MongoClient } from "mongodb";
import { UserRequest } from "./Interfaces";
import { RESPONSE_MESSAGE } from "./constants";
import { User } from "../UserModule/user";

export interface DBConnectionService {
  setConnection(): Promise<void>;
  getCollection(): Promise<Collection<User>>;
}

// MongoDB Implementation
export class MongoDBConnection implements DBConnectionService {
  private client!: MongoClient;

  async setConnection(): Promise<void> {
    try {
      this.client = new MongoClient(
        "mongodb+srv://kaushikjain1111:Pyan5VPslEbogYBo@signupapi.b4iwoxe.mongodb.net/"
      );
      await this.client.connect();
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  async getCollection(): Promise<Collection<User>> {
    try {
      await this.setConnection();
      const database: Db = this.client.db("user");
      const collection: Collection<User> = database.collection("users");
      return collection;
    } catch (error) {
      console.error("Error getting collection:", error);
      throw error;
    }
  }
}

// MySQL Implementation (for future use)
export class MySQLDBConnection implements DBConnectionService {
  async setConnection(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getCollection(): Promise<Collection<User>> {
    throw new Error("Method not implemented.");
  }
}

export class DBConnection {
  private dbConnectionService!: DBConnectionService;

  constructor() {
    this.setDbConnectionService();
  }

  public getDbConnectionService() {
    return this.dbConnectionService;
  }
  public setDbConnectionService(dbConnectionType?: string) {
    let DbConnectionObject!: DBConnectionService;
    if (dbConnectionType == "mysql") {
      DbConnectionObject = new MySQLDBConnection();
    } else {
      DbConnectionObject = new MongoDBConnection();
    }
    this.dbConnectionService = DbConnectionObject;
  }
}
