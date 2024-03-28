import { UserRequest } from "../utils/Interfaces";
import * as fs from "fs";
import * as path from "path";
import { CONSTANTS, RESPONSE_MESSAGE } from "../utils/contants";
export class DirectoryManager {
  private userDataPath: string = "";
  async createUserFileInDirectory(user: UserRequest): Promise<string> {
    try {
      this.userDataPath = path.join(__dirname, "..", CONSTANTS.usersDataFolder);
      // Create a directory for Users-Data if it does not exist
      if (!fs.existsSync(this.userDataPath)) {
        fs.mkdirSync(this.userDataPath);
        console.log(RESPONSE_MESSAGE.directoryCreationSuccess);
      }
      return this.writeUserDataToFile(user);
    } catch (error) {
      return RESPONSE_MESSAGE.directoryCreationFailure;
    }
  }

  writeUserDataToFile(user: any): string {
    try {
    const userFilePath = path.join(this.userDataPath, `${user.email}.json`);
    const userData = JSON.stringify(user, null, 2);
    fs.writeFileSync(userFilePath, userData);
    return `${user.email} - ${RESPONSE_MESSAGE.fileCreationSuccess}`;
  }
  catch{ 
    return `${user.email} - ${RESPONSE_MESSAGE.fileCreationFailure}`;
    }
  }
}
