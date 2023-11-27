import axios from 'axios';
import * as readline from 'readline';

class UserCarbonFootprint {
  inboxCarbonEmissionRate: number = 0.3;
  sentCarbonEmissionRate: number = 0.3;
  spamCarbonEmissionRate: number = 0.03;
  emailAddress: string;
  spamEmailCount: number;
  sentEmailCount: number;
  inboxEmailCount: number;

  constructor(emailAddress: string, spamEmailCount: number, sentEmailCount: number, inboxEmailCount: number) {
    this.emailAddress = emailAddress;
    this.spamEmailCount = spamEmailCount;
    this.sentEmailCount = sentEmailCount;
    this.inboxEmailCount = inboxEmailCount;
  }

  getEmailDomain(): string {
    const emailDomain = this.emailAddress.split("@")[1].split(".")[0];
    const validDomains = ["gmail", "outlook", "yahoo"];
    if (validDomains.includes(emailDomain)) {
      return emailDomain;
    }

    return "Invalid Domain";
  }

  printUserCarbonFootprint(): void {
    console.log("-------------OUTPUT-------------");
    const emailDomain = this.getEmailDomain();
    if (emailDomain !== "Invalid Domain") {
      const inboxCarbonFootprint = (this.inboxEmailCount * this.inboxCarbonEmissionRate) / 1000;
      const sentCarbonFootprint = (this.sentEmailCount * this.sentCarbonEmissionRate) / 1000;
      const spamCarbonFootprint = (this.spamEmailCount * this.spamCarbonEmissionRate) / 1000;
      const totalCarbonFootprint = inboxCarbonFootprint + sentCarbonFootprint + spamCarbonFootprint;
      console.log("Domain: " + emailDomain);
      console.log("Inbox Carbon Footprint: " + inboxCarbonFootprint + "KG");
      console.log("Sent Carbon Footprint: " + sentCarbonFootprint + "KG");
      console.log("Spam Carbon Footprint: " + spamCarbonFootprint + "KG");
      console.log("Total Consumption: " + totalCarbonFootprint + "KG");
    } else {
      console.log("Invalid email");
    }
  }
}

class ServerCarbonFootprint {
  numberOfEmail: number;

  constructor(numberOfEmail: number) {
    this.numberOfEmail = numberOfEmail;
  }

  printServerCarbonFootprint(): void {
    console.log("-------------OUTPUT-------------");
    console.log("Total Server Carbon Footprint: " + this.numberOfEmail * 0.02 + "KG");
  }
}

let userInfos: any[] = [];

async function fetchUserData(): Promise<void> {
  try {
    const apiURL = 'https://api.jsonbin.io/v3/b/654887aa12a5d37659957bd1';
    const fetchedInfo = await axios.get(apiURL);

    if (fetchedInfo.status === 200) {
      const fetchedData = fetchedInfo.data;
      userInfos = fetchedData.record;
    } else {
      console.error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
}

async function getEmailAddressInput(): Promise<string> {
  const emailAddressInputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    emailAddressInputInterface.question('Enter an email address: ', (emailAddress) => {
      emailAddressInputInterface.close();
      resolve(emailAddress);
    });
  });
}


async function getNumberOfEmailForServer(): Promise<number> {
  const emailCountInputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<number>((resolve) => {
    emailCountInputInterface.question('Enter number of emails: ', (numberOfEmail) => {
      emailCountInputInterface.close();
      resolve(Number(numberOfEmail));
    });
  });
}


async function emailCarbonFootprint(): Promise<void> {
  await fetchUserData();

  const emailAddress = await getEmailAddressInput();

  const user = userInfos.find((user) => user.email === emailAddress);

  if (user) {
    const spamEmailCount = user.spam;
    const inboxEmailCount = user.inbox;
    const sentEmailCount = user.sent;

    if (emailAddress.includes("@")) {
      const userCarbonFootprint = new UserCarbonFootprint(
        emailAddress,
        spamEmailCount,
        sentEmailCount,
        inboxEmailCount
      );
      userCarbonFootprint.printUserCarbonFootprint();
    } else {
      console.log('Email address not found in the data.');
    }
  } else {
    const numberOfEmail = await getNumberOfEmailForServer();
    const serverCarbonFootprint = new ServerCarbonFootprint(numberOfEmail);
    serverCarbonFootprint.printServerCarbonFootprint();
  }
}

emailCarbonFootprint();
