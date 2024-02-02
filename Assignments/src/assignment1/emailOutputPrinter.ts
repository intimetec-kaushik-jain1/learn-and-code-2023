import * as Constants from "./constants";
export interface EmailCarbonFootprintData {
  emailAddress: string;
  inboxEmailCount: number;
  sentEmailCount: number;
  spamEmailCount: number;
}
export class OutputPrinter {
  static printData(emailData: EmailCarbonFootprintData): void {
    console.log("-------------OUTPUT-------------");
    const emailDomain: string = this.extractEmailDomain(
      emailData.emailAddress
    );

    if (emailDomain !== "Invalid Domain") {
      this.printValidEmailData(emailData, emailDomain);
    } else {
      this.printInvalidEmail();
    }
  }

  static extractEmailDomain(emailAddress: string): string {
    const emailDomain: string = emailAddress.split("@")[1]?.split(".")[0];
    const validDomains: string[] = ["gmail", "outlook", "yahoo"];

    if (validDomains.includes(emailDomain)) {
      return emailDomain;
    }
    return "Invalid Domain";
  }

  static printValidEmailData(
    emailData: EmailCarbonFootprintData,
    emailDomain: string
  ): void {
    const inboxCarbonFootprint: number =
      (emailData.inboxEmailCount * Constants.INBOX_EMISSION_RATE) /
      Constants.Gram_To_Kilogram;
    const sentCarbonFootprint: number =
      (emailData.sentEmailCount * Constants.SENT_EMISSION_RATE) /
      Constants.Gram_To_Kilogram;
    const spamCarbonFootprint: number =
      (emailData.spamEmailCount * Constants.SPAM_EMISSION_RATE) /
      Constants.Gram_To_Kilogram;

    const totalCarbonFootprint: number =
      inboxCarbonFootprint + sentCarbonFootprint + spamCarbonFootprint;

    console.log("Domain: " + emailDomain);
    console.log("Inbox Carbon Footprint: " + inboxCarbonFootprint + " KG");
    console.log("Sent Carbon Footprint: " + sentCarbonFootprint + " KG");
    console.log("Spam Carbon Footprint: " + spamCarbonFootprint + " KG");
    console.log("Total Consumption: " + totalCarbonFootprint + " KG");
  }

  static printInvalidEmail(): void {
    console.log("Invalid email");
  }
}
