import { google } from "googleapis";
import readline from "readline";
import fs from "fs";
import {
  EmailCarbonFootprintData,
  EmailCarbonFootprintPrinter,
} from "./emailCarbonFootprint";
import { ServerCarbonFootprintPrinter } from "./serverCarbonFootprint";
import { GmailAuthenticator, GmailLabelCounter } from "./gmail";
import path from "path";
export class CarbonFootprintManager {
  static async CarbonFootprint(): Promise<void> {
    const type = await CarbonFootprintManager.getUserInput(
      "Enter Type (Email/Server): "
    );

    if (type.toLowerCase() === "email") {
      await CarbonFootprintManager.processEmailType();
    } else if (type.toLowerCase() === "server") {
      await CarbonFootprintManager.processServerType();
    } else {
      console.log("Incorrect Input, Please Try Again!");
    }
  }

  static async getUserInput(question: string): Promise<string> {
    const inputInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      inputInterface.question(question, (userInput: string) => {
        inputInterface.close();
        resolve(userInput);
      });
    });
  }

  static async processEmailType(): Promise<void> {
    try {
      const credentials = await CarbonFootprintManager.readCredentialsFile();
      const auth = await CarbonFootprintManager.authorizeGmail(credentials);
      await CarbonFootprintManager.generateCarbonReport(auth);
    } catch (error) {
      console.error(error);
    }
  }

  static async processServerType(): Promise<void> {
    try {
      const numberOfEmail = await CarbonFootprintManager.getUserInput(
        "Enter number of emails: "
      );
      ServerCarbonFootprintPrinter.printData(parseInt(numberOfEmail));
    } catch (error) {
      console.error(error);
    }
  }

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
    return new Promise((resolve, reject) => {
      GmailAuthenticator.authorize(credentials, (auth: any) => {
        resolve(auth);
      });
    });
  }

  static async generateCarbonReport(auth: any): Promise<void> {
    const emailData = await CarbonFootprintManager.fetchEmailStatistics(auth);
    EmailCarbonFootprintPrinter.printData(emailData);
  }

  static async fetchEmailStatistics(
    auth: any
  ): Promise<EmailCarbonFootprintData> {
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

    return {
      emailAddress: "kaushikjain67890@gmail.com",
      inboxEmailCount,
      sentEmailCount,
      spamEmailCount,
    };
  }
}
