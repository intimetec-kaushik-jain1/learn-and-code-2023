import { User } from "../UserModule/user";
import { UserRequest } from "../utils/Interfaces";
import { DirectoryManager } from "../DirectoryModule/directory";
import { Notifier } from "../NotificationModule/notification";
import { isUserAlreadyExist } from "../utils/utils";
import { RESPONSE_MESSAGE } from "../utils/contants";

export class SignupAPI {
  private user: User;
  private directoryManager: DirectoryManager;
  private notifier: Notifier;

  constructor() {
    this.user = new User();
    this.directoryManager = new DirectoryManager();
    this.notifier = new Notifier();
  }

  async signup(user: UserRequest): Promise<void> {
    try {
      if (await isUserAlreadyExist(user)) {
        console.log(RESPONSE_MESSAGE.userAlreadyExist);
        return;
      } else {
        await this.createUser(user);
        await this.createUserFileInDirectory(user);
        this.notifier.notifyRegisterSuccess(user);
        this.user.populateDefaultData(user.role);
        return;
      }
    } catch (error: any) {
      this.notifier.notifyRegisterFailure(user, error.message);
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
