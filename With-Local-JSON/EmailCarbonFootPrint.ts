// With Local JSON use :
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
    console.log("-------------OUTPUT-------------");
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
      console.log("Total Consumption : " + totalCarbonCount + "KG");
    } else {
      console.log("Invalid email");
    }
  }
}

class ServerCarbonFootprint {
  constructor(numberOfEmailsProcessed) {
    this.numberOfEmailsProcessed = numberOfEmailsProcessed;
  }

  printCarbonFootprint() {
    console.log("-------------OUTPUT-------------");
    console.log("Total: " + this.numberOfEmailsProcessed * 0.02 + "KWH");
  }
}

const userInfo = [
  {
    email: "kaushikjain@gmail.com",
    inbox: 221,
    spam: 67,
    sent: 29,
  },
  {
    email: "mukul@yahoo.com",
    inbox: 129,
    spam: 135,
    sent: 10,
  },
  {
    email: "arihant@outlook.com",
    inbox: 223,
    spam: 56,
    sent: 98,
  },
];

function main() {
  for (const user of userInfo) {
    const emailAddress = user.email;
    const spamCount = user.spam;
    const inboxCount = user.inbox;
    const sentCount = user.sent;

    if (emailAddress.includes("@")) {
      const entity = new EmailCarbonFootprint(
        emailAddress,
        spamCount,
        sentCount,
        inboxCount
      );
      entity.printCarbonFootprint();
    } else {
      const numberOfEmailsProcessed = user.inbox + user.sent + user.spam;
      const entity = new ServerCarbonFootprint(numberOfEmailsProcessed);
      entity.printCarbonFootprint();
    }
  }
}

main();
