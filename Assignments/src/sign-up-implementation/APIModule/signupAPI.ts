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
      }
      this.user.createUser(user);
      this.notifier.notifyLoginSuccess(user);
      this.user.populateDefaultData(user.role);
      this.directoryManager.createDirectory(user);
    } catch (error: any) {
      this.notifier.notifyLoginFailure(user, error.message);
    }
  }
}
