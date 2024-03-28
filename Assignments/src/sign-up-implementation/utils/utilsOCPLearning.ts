// import { MongoClient } from "mongodb";
// import { UserRequest } from "./Interfaces";
// import { RESPONSE_MESSAGE } from "./contants";

// interface DBConnection {
//   setConnection(): Promise<void>;
//   getCollection(): any;
//   isUserAlreadyExist(user: UserRequest): Promise<any>;
// }

// // MongoDB Implementation
// class MongoDBConnection implements DBConnection {
//   private client: any;

//   async setConnection(): Promise<void> {
//     this.client = new MongoClient(
//       "mongodb+srv://kaushikjain1111:Pyan5VPslEbogYBo@signupapi.b4iwoxe.mongodb.net/"
//     );
//     await this.client.connect();
//   }

//   getCollection() {
//     const database = this.client.db("user");
//     const collection = database.collection("users");
//     return collection;
//   }

//   async isUserAlreadyExist(user: UserRequest) {
//     const collection = this.getCollection();
//     try {
//       const existingUser = await collection.findOne({ email: user.email });
//       return existingUser;
//     } catch (error) {
//       console.error(RESPONSE_MESSAGE.errorFindingUser, ":", error);
//       return false;
//     }
//   }
// }

// // MySQL Implementation
// class MySQLDBConnection implements DBConnection {
//   setConnection(): Promise<void> {
//     throw new Error("Method not implemented.");
//   }

//   getCollection() {
//     throw new Error("Method not implemented.");
//   }

//   isUserAlreadyExist(user: UserRequest): Promise<any> {
//     throw new Error("Method not implemented.");
//   }
// }

// // Function to initialize and return the appropriate DBConnection instance
// export function getDBConnection(): DBConnection {
//   // Return the appropriate connection based on configuration or other factors
//   return new MongoDBConnection();
// }
