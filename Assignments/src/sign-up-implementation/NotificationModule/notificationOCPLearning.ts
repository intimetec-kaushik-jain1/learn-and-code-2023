import nodemailer = require("nodemailer");
import { Transporter } from "nodemailer";
import { UserRequest } from "../utils/Interfaces";
import { CONSTANTS, RESPONSE_MESSAGE } from "../utils/constants";

interface NotificationService {
  notifyRegisterFailure(user: UserRequest, errorMessage: string): any;
  notifyRegisterSuccess(user: UserRequest, successMessage?: string): any; // successMessage is optional
}

class EmailNotificationService implements NotificationService {
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
      console.log(RESPONSE_MESSAGE.mailSendSuccess);
    } catch (error) {
      console.error(RESPONSE_MESSAGE.mailSendFailure + error);
      throw error;
    }
  }

  async notifyRegisterFailure(user: UserRequest, errorMessage: string) {
    const subject = RESPONSE_MESSAGE.registerFailure;
    const text = `${CONSTANTS.Dear} ${user.name}, ${RESPONSE_MESSAGE.contactSupportMessage},\n\n  ${CONSTANTS.Error}: ${errorMessage}`;
    await this.sendEmail(user.email, subject, text);
  }

  async notifyRegisterSuccess(user: UserRequest) {
    const subject = RESPONSE_MESSAGE.registerSuccess;
    const text = `${CONSTANTS.Dear} ${user.name},${RESPONSE_MESSAGE.registerSuccessfulMessage}\n\n ${RESPONSE_MESSAGE.thankYou}`;
    await this.sendEmail(user.email, subject, text);
    console.log(RESPONSE_MESSAGE.signupSuccess);
  }
}

// Text Message Implementation (for future use)

class TextNotificationService implements NotificationService {
  notifyRegisterFailure(): any {}
  notifyRegisterSuccess(): any {}
}

// Function to initialize and return the appropriate notifiy instance
export async function Notifier() {
  const emailNotificationService = new EmailNotificationService();
  return emailNotificationService;
}
