import { User } from "../UserModule/user";
import { UserRequest } from "../utils/Interfaces";
import { DirectoryManager } from "../DirectoryModule/directory";
import { RESPONSE_MESSAGE } from "../utils/constants";
import {
  Notification,
  NotificationService,
} from "../NotificationModule/notificationOCP";

export class SignupAPI {
  private user: User;
  private directoryManager!: DirectoryManager;
  private notification: NotificationService;
  private messages: string[] = [];

  constructor() {
    this.user = new User();
    this.notification = new Notification().getNotificationService();
  }

  async signup(user: UserRequest): Promise<void> {
    let message = "";
    try {
      let isUserExisted: string = await this.user.isUserAlreadyExist(user);

      if (isUserExisted == RESPONSE_MESSAGE.userFindSuccess) {
        message = await this.notification.sendRegisterFailureMail(user);
        this.messages.push(message);
      } else {
        // user exist, now perform all operations :
        this.directoryManager = new DirectoryManager();

        message = await this.user.createUser(user);
        this.messages.push(message);

        message = await this.user.populateDefaultData(user.role);
        this.messages.push(message);

        message = await this.directoryManager.createUserFileInDirectory(user);
        this.messages.push(message);

        message = await this.notification.sendRegisterSuccessMail(user);
        this.messages.push(message);
      }
      console.log(this.messages);
      return;
    } catch (error: any) {
      throw error;
    }
  }
}
