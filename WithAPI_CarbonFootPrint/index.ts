const { google } = require("googleapis");
const readline = require("readline");
const fs = require("fs");

const SCOPES: string[] = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.labels",
];

interface EmailCarbonFootprintData {
  emailAddress: string;
  inboxEmailCount: number;
  sentEmailCount: number;
  spamEmailCount: number;
}

class GmailLabelCounter {
  static async getCount(gmail: any, labelId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      gmail.users.labels.get(
        {
          userId: "me",
          id: labelId,
        },
        (error : Error, labelResponse) => {
          if (error) {
            reject(`Error retrieving ${labelId} label: ${error.message}`);
          } else {
            const label: any = labelResponse?.data;

            if (label && label.messagesTotal !== undefined) {
              resolve(label.messagesTotal);
            } else {
              reject(`Label or messagesTotal is undefined`);
            }
          }
        }
      );
    });
  }
}

class EmailCarbonFootprintCalculator {
  static calculate(
    inboxCount: number,
    sentCount: number,
    spamCount: number
  ): number {
    const inboxEmissionRate: number = 0.3;
    const sentEmissionRate: number = 0.3;
    const spamEmissionRate: number = 0.03;

    const inboxCarbonFootprint: number =
      (inboxCount * inboxEmissionRate) / 1000;
    const sentCarbonFootprint: number = (sentCount * sentEmissionRate) / 1000;
    const spamCarbonFootprint: number = (spamCount * spamEmissionRate) / 1000;

    return inboxCarbonFootprint + sentCarbonFootprint + spamCarbonFootprint;
  }
}

class EmailCarbonFootprintPrinter {
  static printData(emailData: EmailCarbonFootprintData): void {
    console.log("-------------OUTPUT-------------");
    const emailDomain: string = EmailCarbonFootprintPrinter.extractEmailDomain(
      emailData.emailAddress
    );

    if (emailDomain !== "Invalid Domain") {
      EmailCarbonFootprintPrinter.printValidEmailData(emailData, emailDomain);
    } else {
      EmailCarbonFootprintPrinter.printInvalidEmail();
    }
  }

  static printValidEmailData(
    emailData: EmailCarbonFootprintData,
    emailDomain: string
  ): void {
    const totalCarbonFootprint: number =
      EmailCarbonFootprintCalculator.calculate(
        emailData.inboxEmailCount,
        emailData.sentEmailCount,
        emailData.spamEmailCount
      );

    console.log("Domain: " + emailDomain);
    console.log(
      "Inbox Carbon Footprint: " +
      (emailData.inboxEmailCount * 0.3) / 1000 +
      " KG"
    );
    console.log(
      "Sent Carbon Footprint: " +
      (emailData.sentEmailCount * 0.3) / 1000 +
      " KG"
    );
    console.log(
      "Spam Carbon Footprint: " +
      (emailData.spamEmailCount * 0.03) / 1000 +
      " KG"
    );
    console.log("Total Consumption: " + totalCarbonFootprint + " KG");
  }

  static printInvalidEmail(): void {
    console.log("Invalid email");
  }

  static extractEmailDomain(emailAddress: string): string {
    const emailDomain: string = emailAddress.split("@")[1]?.split(".")[0];
    const validDomains: string[] = ["gmail", "outlook", "yahoo"];

    if (validDomains.includes(emailDomain)) {
      return emailDomain;
    }
    return "Invalid Domain";
  }
}

class ServerCarbonFootprintCalculator {
  static calculate(numberOfEmail: number): number {
    return numberOfEmail * 0.02;
  }
}

class ServerCarbonFootprintPrinter {
  static printData(numberOfEmail: number): void {
    console.log("-------------OUTPUT-------------");
    console.log(
      "Total Server Carbon Footprint: " +
      ServerCarbonFootprintCalculator.calculate(numberOfEmail) +
      " KG"
    );
  }
}

class ServerEmailInputHandler {
  static async getNumberOfEmail(): Promise<number> {
    const emailCountInputInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<number>((resolve) => {
      emailCountInputInterface.question(
        "Enter number of emails: ",
        (numberOfEmail: number) => {
          emailCountInputInterface.close();
          resolve(Number(numberOfEmail));
        }
      );
    });
  }
}

class GmailAuthenticator {
  static authorize(
    credentials: {
      web: {
        client_secret: string;
        client_id: string;
        redirect_uris: string[];
      };
    },
    callback: (auth: any) => void
  ): void {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client: any = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    const tokenPath: string = "token.json";

    try {
      const token: Buffer = fs.readFileSync(tokenPath);
      oAuth2Client.setCredentials(JSON.parse(token.toString()));
      callback(oAuth2Client);
    } catch (error) {
      GmailAuthenticator.getAccessToken(oAuth2Client, (auth: any) => {
        callback(auth);
      });
    }
  }
  static getAccessToken(
    oAuth2Client: any,
    callback: (auth: any) => void
  ): void {
    const authUrl: string = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    console.log("Visit this URL to authorize the app:", authUrl);

    const userInputInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    userInputInterface.question(
      "Enter the code from the page here: ",
      (code: string) => {
        userInputInterface.close();
        oAuth2Client.getToken(code, (error: Error, token: any) => {
          if (error) {
            console.error("Error retrieving access token:", error);
            return;
          }

          oAuth2Client.setCredentials(token);
          fs.writeFileSync("token.json", JSON.stringify(token));
          callback(oAuth2Client);
        });
      }
    );
  }
}

class CarbonFootprintManager {
  static async fetchAndPrintEmailCarbonFootprint(auth: any): Promise<void> {
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

    const emailData: EmailCarbonFootprintData = {
      emailAddress: "kaushikjain67890@gmail.com",
      inboxEmailCount,
      sentEmailCount,
      spamEmailCount,
    };

    EmailCarbonFootprintPrinter.printData(emailData);
  }

  static async processEmailType(): Promise<void> {
    try {
      const credentials = await CarbonFootprintManager.readCredentialsFile();
      const auth = await CarbonFootprintManager.authorizeGmail(credentials);
      await CarbonFootprintManager.fetchAndPrintEmailCarbonFootprint(auth);
    } catch (error) {
      console.error(error);
    }
  }

  static async processServerType(): Promise<void> {
    try {
      const numberOfEmail = await ServerEmailInputHandler.getNumberOfEmail();
      ServerCarbonFootprintPrinter.printData(numberOfEmail);
    } catch (error) {
      console.error(error);
    }
  }

  static async readCredentialsFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile("credentials.json", (error : Error, credentials) => {
        if (error) {
          reject(`Error loading client secret file: ${error}`);
        } else {
          resolve(JSON.parse(credentials.toString()));
        }
      });
    });
  }

  static async authorizeGmail(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      GmailAuthenticator.authorize(credentials, (auth: any) => {
        resolve(auth);
      });
    });
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

  static async CarbonFootprint(): Promise<void> {
    const type = await CarbonFootprintManager.getUserInput("Enter Type (Email/Server): ");

    if (type.toLowerCase() === "email") {
      await CarbonFootprintManager.processEmailType();
    } else if (type.toLowerCase() === "server") {
      await CarbonFootprintManager.processServerType();
    } else {
      console.log("Incorrect Input, Please Try Again!");
    }
  }
}

CarbonFootprintManager.CarbonFootprint();