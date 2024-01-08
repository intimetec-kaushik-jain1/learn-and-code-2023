export interface EmailCarbonFootprintData {
  emailAddress: string;
  inboxEmailCount: number;
  sentEmailCount: number;
  spamEmailCount: number;
}

export class EmailCarbonFootprintCalculator {
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

export class EmailCarbonFootprintPrinter {
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
