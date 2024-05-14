import { UserRequest, UserRole } from "../utils/Interfaces";
import { CONSTANTS, RESPONSE_MESSAGE } from "../utils/constants";
import { DBConnection, DBConnectionService } from "../utils/DbConnection";
// import getCollection
export class User implements UserRequest {
  name!: string;
  password!: string;
  confirmPassword!: string;
  role!: UserRole;
  email!: string;
  dbConnection: DBConnectionService;

  constructor() {
    this.dbConnection = new DBConnection().getDbConnectionService();
  }

  async createUser(user: any): Promise<any> {
    try {
      const result = await (
        await this.dbConnection.getCollection()
      ).insertOne(user);
      if (result.acknowledged) {
        return RESPONSE_MESSAGE.userCreationSuccess;
      } else {
        return RESPONSE_MESSAGE.userCreationFailure;
      }
    } catch (error) {
      return RESPONSE_MESSAGE.errorUserCreation;
    }
  }

  async populateDefaultData(userRole: UserRole): Promise<string> {
    if (userRole == "user") {
      //view and edit
    } else if (userRole === "viewer") {
      // view
    } else if (userRole === "admin") {
      // view , new user add, edit
    } else {
      console.log(CONSTANTS.roleNotDefined);
    }
    return `${RESPONSE_MESSAGE.defaultDataPopulated} `;
  }

  async isUserAlreadyExist(user: UserRequest): Promise<string> {
    try {
      const isUserExisted = await (
        await this.dbConnection.getCollection()
      ).findOne({ email: user.email });
      
      if (isUserExisted) {
        return `${RESPONSE_MESSAGE.userFindSuccess}`;
      } else {
        return `${RESPONSE_MESSAGE.userFindFailure}`;
      }
    } catch (error) {
      return `${RESPONSE_MESSAGE.errorFindingUser}`;
    }
  }
}
