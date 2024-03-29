import { User } from "../UserModule/user";
import { UserRequest } from "../utils/Interfaces";
import { DirectoryManager } from "../DirectoryModule/directory";
import { Notifier } from "../NotificationModule/notificationOCPLearning";
import { getDBConnection } from "../utils/utilsOCPLearning";
import { RESPONSE_MESSAGE } from "../utils/constants";

export class SignupAPI {
  private user: User;
  private directoryManager: DirectoryManager;

  constructor() {
    this.user = new User();
    this.directoryManager = new DirectoryManager();
  }

  async signup(user: UserRequest): Promise<void> {
    const notifier = await Notifier();
    try {
      const dbConnection = await getDBConnection();
      if (await dbConnection.isUserAlreadyExist(user)) {
        console.log(RESPONSE_MESSAGE.userAlreadyExist);
        return;
      } else {
        await this.createUser(user);
        await this.createUserFileInDirectory(user);
        notifier.notifyRegisterSuccess(user);
        this.user.populateDefaultData(user.role);
        return;
      }
    } catch (error: any) {
      notifier.notifyRegisterFailure(user, error.message);
    }
  }

  private async createUser(user: UserRequest): Promise<void> {
    const userCreationResult = await this.user.createUser(user);
    if (userCreationResult !== RESPONSE_MESSAGE.userCreationSuccess) {
      console.error("User creation failed:", userCreationResult);
    } else {
      console.log(RESPONSE_MESSAGE.userCreationSuccess);
    }
  }

  private async createUserFileInDirectory(user: UserRequest): Promise<void> {
    const fileCreationResult =
      await this.directoryManager.createUserFileInDirectory(user);
    console.log(fileCreationResult);
  }
}
