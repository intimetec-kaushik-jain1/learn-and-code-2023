import { UserRequest, UserRole } from "../utils/Interfaces";
import { getCollection } from "../utils/utils";
import { CONSTANTS, RESPONSE_MESSAGE } from "../utils/contants";
export class User implements UserRequest {
  name!: string;
  password!: string;
  confirmPassword!: string;
  role!: UserRole;
  email!: string;

  async createUser(user: UserRequest): Promise<string> {
    try {
      const collection = await getCollection()
      await collection.insertOne(user);
      return RESPONSE_MESSAGE.userCreationSuccess;
    } catch (error) {
      return RESPONSE_MESSAGE.userCreationFailure;
    }
  }

  populateDefaultData(userRole: UserRole): void {
    if (userRole == "user") {
      //view and edit
    } else if (userRole === "viewer") {
      // view
    } else if (userRole === "admin") {
      // view , new user add, edit
    } else {
      console.log(CONSTANTS.roleNotDefined);
    }
  }
}
