class EmailCarbonFootprint {
  constructor(emailAddress, spamCount, sentCount, inboxCount) {
    this.emailAddress = emailAddress;
    this.spamCount = spamCount;
    this.sentCount = sentCount;
    this.inboxCount = inboxCount;
  }

  getEmailDomain() {
    const domain = this.emailAddress.split("@")[1].split(".")[0];
    const validDomains = ["gmail", "outlook", "yahoo"];
    if (validDomains.includes(domain)) {
      return domain;
    }

    return "Invalid Domain";
  }

  printCarbonFootprint() {
    console.log("-------------OUTPUT--------");
    const domain = this.getEmailDomain();
    if (domain !== "Invalid Domain") {
      const inboxCarbonCount = (this.inboxCount * 0.3) / 1000;
      const sentCarbonCount = (this.sentCount * 0.3) / 1000;
      const spamCarbonCount = (this.spamCount * 0.03) / 1000;
      const totalCarbonCount =
        inboxCarbonCount + sentCarbonCount + spamCarbonCount;
      console.log("Domain: " + domain);
      console.log("Inbox: " + inboxCarbonCount + "KG");
      console.log("Sent: " + sentCarbonCount + "KG");
      console.log("Spam: " + spamCarbonCount + "KG");
      console.log("Total Consuption : " + totalCarbonCount + "KG");
    } else {
      console.log("Invalid email1");
    }
  }
}

class ServerCarbonFootprint {
  constructor(numberOfEmailsProcessed) {
    this.numberOfEmailsProcessed = numberOfEmailsProcessed;
  }

  printCarbonFootprint() {
    console.log("-------------OUTPUT--------");
    console.log("Total: " + this.numberOfEmailsProcessed * 0.02 + "KWH");
  }
}

function main() {
  const entityType = prompt(
    "Kindly specify the entity type (Email/Server)"
  ).toLowerCase();

  if (entityType === "email") {
    const emailAddress = prompt("Enter Email Address: ") || "";
    const spamCount = parseInt(
      prompt("Enter the number of Spam mails: ") || "0"
    );
    const inboxCount = parseInt(
      prompt("Enter the number of Inbox mails: ") || "0"
    );
    const sentCount = parseInt(
      prompt("Enter the number of Sent mails: ") || "0"
    );
    const entity = new EmailCarbonFootprint(
      emailAddress,
      spamCount,
      sentCount,
      inboxCount
    );
    entity.printCarbonFootprint();
  } else if (entityType === "server") {
    const numberOfEmailsProcessed = parseInt(
      prompt("Enter Number of Emails: ") || "0"
    );
    const entity = new ServerCarbonFootprint(numberOfEmailsProcessed);
    entity.printCarbonFootprint();
  } else {
    console.log("Invalid Input");
  }
}

main();
