import nodemailer = require("nodemailer");
import { Transporter } from "nodemailer";
import { UserRequest } from "../utils/Interfaces";
import { CONSTANTS, RESPONSE_MESSAGE } from "../utils/constants";

export interface NotificationService {
  sendRegisterFailureMail(
    user: UserRequest,
    errorMessage?: string
  ): Promise<string>;

  sendRegisterSuccessMail(
    user: UserRequest,
    successMessage?: string
  ): Promise<string>; // successMessage is optional
}
// Email Message Implementation
export class EmailNotification implements NotificationService {
  private transporter!: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: "kaushikjain67890@gmail.com",
        pass: "tbbliotchakhangs",
      },
      debug: true,
    });
  }

  private async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: "kaushikjain67890@gmail.com",
        to,
        subject,
        text,
      });
    } catch (error) {
      throw error;
    }
  }

  public async sendRegisterFailureMail(
    user: UserRequest,
    errorMessage: string = "Error Sending Mail"
  ): Promise<string> {
    const subject = RESPONSE_MESSAGE.registerFailureMailSubject;
    const text = `${CONSTANTS.Dear} ${user.name}, ${RESPONSE_MESSAGE.contactSupportMessage},\n\n  ${CONSTANTS.Error}: ${errorMessage}`;
    await this.sendEmail(user.email, subject, text);
    return `${RESPONSE_MESSAGE.mailSendFailure}`;
  }

  public async sendRegisterSuccessMail(
    user: UserRequest,
    successMessage: string
  ): Promise<string> {
    const subject = RESPONSE_MESSAGE.registerSuccessMailSubject;
    const text = `${CONSTANTS.Dear} ${user.name},${RESPONSE_MESSAGE.registerSuccessfulMessage}\n\n ${RESPONSE_MESSAGE.thankYou}`;
    await this.sendEmail(user.email, subject, text);
    return `${RESPONSE_MESSAGE.mailSendSuccess}`;
  }
}

// Text Message Implementation (for future use)
export class TextNotification implements NotificationService {
  async sendRegisterFailureMail(
    user: UserRequest,
    successMessage: string
  ): Promise<string> {
    return "needs Implementation";
  }
  async sendRegisterSuccessMail(
    user: UserRequest,
    errorMessage: string
  ): Promise<string> {
    return "needs Implementation";
  }
}

export class Notification {
  private notificationService!: NotificationService;

  constructor() {
    this.setNotificationService();
  }

  public getNotificationService() {
    return this.notificationService;
  }

  private setNotificationService(notificationType?: string): void {
    let notificationObject: NotificationService;
    if (notificationType == "text") {
      notificationObject = new TextNotification();
    } else {
      notificationObject = new EmailNotification();
    }

    this.notificationService = notificationObject;
  }
}
