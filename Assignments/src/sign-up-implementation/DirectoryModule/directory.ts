import { UserRequest } from "../utils/Interfaces";
import * as fs from "fs";
import * as path from "path";
import { isUserAlreadyExist } from "../utils/utils";
import { CONSTANTS, RESPONSE_MESSAGE } from "../utils/contants";
export class DirectoryManager {
  private userDataPath: string = "";
  async createDirectory(user: UserRequest): Promise<void> {
    try {
      if (await isUserAlreadyExist(user)) {
        return;
      }
      this.userDataPath = path.join(__dirname, "..", CONSTANTS.usersDataFolder);
      // Create a directory for userData if it does not exist
      if (!fs.existsSync(this.userDataPath)) {
        fs.mkdirSync(this.userDataPath);
        console.log(RESPONSE_MESSAGE.directoryCreationSuccess);
      }
      this.writeUserDataToFile(user);
    } catch (error) {
      console.error(RESPONSE_MESSAGE.directoryCreationFailure, error);
    }
  }

  writeUserDataToFile(user: any) {
    const userFilePath = path.join(this.userDataPath, `${user.email}.json`);
    const userData = JSON.stringify(user, null, 2);
    fs.writeFileSync(userFilePath, userData);
    console.log(`${user.email} - ${RESPONSE_MESSAGE.fileCreationSuccess}`);
  }
}
