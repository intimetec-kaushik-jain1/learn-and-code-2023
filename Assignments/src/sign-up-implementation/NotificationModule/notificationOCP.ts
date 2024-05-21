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
  private transporter: Transporter;

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
    successMessage?: string
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
    errorMessage?: string
  ): Promise<string> {
    // Placeholder implementation
    return "Text message sending for failure needs implementation";
  }

  async sendRegisterSuccessMail(
    user: UserRequest,
    successMessage?: string
  ): Promise<string> {
    // Placeholder implementation
    return "Text message sending for success needs implementation";
  }
}

// Notification Wrapper Implementation
export class Notification {
  private notificationService: NotificationService;

  constructor(notificationType?: string) {
    this.notificationService = this.createNotificationService(notificationType);
  }

  public getNotificationService(): NotificationService {
    return this.notificationService;
  }

  private createNotificationService(notificationType?: string): NotificationService {
    if (notificationType === "text") {
      return new TextNotification();
    } else {
      return new EmailNotification();
    }
  }
}
