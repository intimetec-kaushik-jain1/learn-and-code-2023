class Email {
  emailAddress: string;
  spamCount: number;
  sentCount: number;
  inboxCount: number;

  constructor(emailAddress: string, spamCount: number, sentCount: number, inboxCount: number) {
    this.emailAddress = emailAddress;
    this.spamCount = spamCount;
    this.sentCount = sentCount;
    this.inboxCount = inboxCount;
  }

  getEmailDomain(): string {
    const atrPosition = this.emailAddress.indexOf('@');
    const dotPosition = this.emailAddress.indexOf('.');
    
    if (atrPosition !== -1 && dotPosition !== -1) {
      const domain = this.emailAddress.substring(atrPosition + 1, dotPosition);
      
      if (domain) {
        return domain;
      }
    }
    
    return "Invalid Domain";
  }

  printCarbonFootprint(): void {
    console.log("-------------OUTPUT--------");
    if (this.getEmailDomain() !== "Invalid Domain") {
      console.log("Email Address: " + this.emailAddress);
      console.log("Domain: " + this.getEmailDomain());
      console.log("Inbox: " + (this.inboxCount * 8.65 / 1000) + "KG");
      console.log("Sent: " + (this.sentCount * 0.3 / 1000) + "KG");
      console.log("Spam: " + (this.spamCount * 0.03 / 1000) + "KG");
    } else {
      console.log("Invalid email");
    }
  }
}

const emailAddress: string = prompt("Enter Email Address: ") || "";
const spamCount: number = parseInt(prompt("Enter the number of Spam mails: ") || "0");
const inboxCount: number = parseInt(prompt("Enter the number of Inbox mails: ") || "0");
const sentCount: number = parseInt(prompt("Enter the number of Sent mails: ") || "0");

const entity = new Email(emailAddress, spamCount, sentCount, inboxCount);
entity.printCarbonFootprint();
