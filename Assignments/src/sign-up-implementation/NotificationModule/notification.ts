import nodemailer = require("nodemailer");
import { Transporter } from "nodemailer";
import { UserRequest } from "../utils/Interfaces";
import { isUserAlreadyExist } from "../utils/utils";
import { CONSTANTS, RESPONSE_MESSAGE } from "../utils/contants";

export class Notifier {
  private transporter!: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!),
      secure: Boolean(process.env.SMTP_SECURE),
      service: process.env.SMTP_SERVICE!,
      auth: {
        user: process.env.SMTP_MAIL!,
        pass: process.env.SMTP_PASS!,
      },
    });
  }

  private async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_MAIL!,
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

  async notifyLoginFailure(user: UserRequest, errorMessage: string) {
    if (await isUserAlreadyExist(user)) {
      return;
    }
    const subject = RESPONSE_MESSAGE.loginFailure;
    const text = `${CONSTANTS.Dear} ${user.name}, ${RESPONSE_MESSAGE.contactSupportMessage},\n\n  ${CONSTANTS.Error}: ${errorMessage}`;
    await this.sendEmail(user.email, subject, text);
  }

  async notifyLoginSuccess(user: UserRequest) {
    const subject = RESPONSE_MESSAGE.loginSuccess;
    const text = `${CONSTANTS.Dear} ${user.name},${RESPONSE_MESSAGE.loginSuccessfulMessage}\n\n ${RESPONSE_MESSAGE.thankYou}`;
    await this.sendEmail(user.email, subject, text);
    console.log(RESPONSE_MESSAGE.signupSuccess);
  }
}
