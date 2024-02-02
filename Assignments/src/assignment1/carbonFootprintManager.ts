import { google } from "googleapis";
import fs from "fs";
import { OutputPrinter } from "./emailOutputPrinter";
import { ServerCarbonFootprintPrinter } from "./serverOutputPrinter";
import { GmailAuthenticator, GmailLabelCounter } from "./gmail";
import path from "path";
import { UserInput } from "./userInput";

export class GmailAuthorization {
  static async readCredentialsFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "credentials.json"),
        (error: Error | null, credentials: any) => {
          if (error) {
            reject(`Error loading client secret file: ${error}`);
          } else {
            resolve(JSON.parse(credentials.toString()));
          }
        }
      );
    });
  }

  static async authorizeGmail(credentials: any): Promise<any> {
    return new Promise((resolve) => {
      GmailAuthenticator.authorize(credentials, (auth: any) => {
        resolve(auth);
      });
    });
  }
}
export class CarbonFootprintManager {
  static async processEmailType(): Promise<void> {
    try {
      const credentials = await GmailAuthorization.readCredentialsFile();
      const auth = await GmailAuthorization.authorizeGmail(credentials);
      await this.generateCarbonOutput(auth);
    } catch (error) {
      console.error(error);
    }
  }

  static async processServerType(): Promise<void> {
    try {
      const numberOfEmail = await UserInput.getUserInput(
        "Enter number of emails: "
      );
      ServerCarbonFootprintPrinter.printData(parseInt(numberOfEmail));
    } catch (error) {
      console.error(error);
    }
  }

  static async generateCarbonOutput(auth: any): Promise<void> {
    const gmail: any = google.gmail({ version: "v1", auth });
    const inboxEmailCount: number = await GmailLabelCounter.getCount(
      gmail,
      "INBOX"
    );
    const sentEmailCount: number = await GmailLabelCounter.getCount(
      gmail,
      "SENT"
    );
    const spamEmailCount: number = await GmailLabelCounter.getCount(
      gmail,
      "SPAM"
    );

    const emailData = {
      emailAddress: "kaushikjain67890@gmail.com",
      inboxEmailCount,
      sentEmailCount,
      spamEmailCount,
    };
    OutputPrinter.printData(emailData);
  }
}
