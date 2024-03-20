import { UserRequest, UserRole } from "../utils/Interfaces";
import { IsEmail, IsLength } from "validator.ts/decorator/Validation";
import { isUserAlreadyExist, getCollection } from "../utils/utils";
import { CONSTANTS, RESPONSE_MESSAGE } from "../utils/contants";
export class User implements UserRequest {
  @IsLength(5,20) 
  name!: string;

  @IsLength(5, 20)
  password!: string;

  @IsLength(4, 20)
  role!: UserRole;

  @IsEmail()
  email!: string;

  async createUser(user: UserRequest): Promise<void> {
    try {
      if (await isUserAlreadyExist(user)) {
        console.log(`${user.email} - ${RESPONSE_MESSAGE.userAlreadyExist}`);
        return;
      } else {
        const collection = await getCollection();
        await collection.insertOne(user);
        console.log(RESPONSE_MESSAGE.userCreationSuccess);
      }
    } catch (error) {
      console.error(RESPONSE_MESSAGE.userCreationFailure, error);
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
