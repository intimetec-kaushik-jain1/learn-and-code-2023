import path from "path";
import google = require("googleapis");
import { SCOPES } from "./constants";

import readline = require("readline");
import fs = require("fs");

export class GmailLabelCounter {
  static async getCount(gmail: any, labelId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      gmail.users.labels.get(
        {
          userId: "me",
          id: labelId,
        },
        (error: Error, labelResponse: any) => {
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

export class GmailAuthenticator {
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
    const oAuth2Client: any = new google.Auth.OAuth2Client(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    const tokenPath: string = path.join(__dirname, "token.json");

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
