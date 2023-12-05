const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');

const SCOPES: string[] = ['https://www.googleapis.com/auth/gmail.readonly'];

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
    const emailDomain = this.emailAddress.split('@')[1]?.split('.')[0];
    const validDomains: string[] = ['gmail', 'outlook', 'yahoo'];
    if (validDomains.includes(emailDomain)) {
      return emailDomain;
    }
    return 'Invalid Domain';
  }

  printUserCarbonFootprint(): void {
    console.log('-------------OUTPUT-------------');
    const emailDomain = this.getEmailDomain();
    if (emailDomain !== 'Invalid Domain') {
      const inboxCarbonFootprint: number = (this.inboxEmailCount * this.inboxCarbonEmissionRate) / 1000;
      const sentCarbonFootprint: number = (this.sentEmailCount * this.sentCarbonEmissionRate) / 1000;
      const spamCarbonFootprint: number = (this.spamEmailCount * this.spamCarbonEmissionRate) / 1000;
      const totalCarbonFootprint: number = inboxCarbonFootprint + sentCarbonFootprint + spamCarbonFootprint;
      console.log('Domain: ' + emailDomain);
      console.log('Inbox Carbon Footprint: ' + inboxCarbonFootprint + ' KG');
      console.log('Sent Carbon Footprint: ' + sentCarbonFootprint + ' KG');
      console.log('Spam Carbon Footprint: ' + spamCarbonFootprint + ' KG');
      console.log('Total Consumption: ' + totalCarbonFootprint + ' KG');
    } else {
      console.log('Invalid email');
    }
  }
}

class ServerCarbonFootprint {
  numberOfEmail: number;

  setEmailNumber(numberOfEmail: number) {
    this.numberOfEmail = numberOfEmail;
  }

  printServerCarbonFootprint(): void {
    console.log('-------------OUTPUT-------------');
    console.log('Total Server Carbon Footprint: ' + this.numberOfEmail * 0.02 + 'KG');
  }

  getNumberOfEmailForServer(): Promise<number> {
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
}

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const tokenPath = 'token.json';

  try {
    const token = fs.readFileSync(tokenPath);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    callback(oAuth2Client);
  } catch (error) {
    getAccessToken(oAuth2Client, (callback: any)=>{
      console.log(callback);
    });
  }
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Visit this URL to authorize the app:', authUrl);

  const userInputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  userInputInterface.question('Enter the code from the page here: ', (code: any) => {
    userInputInterface.close();
    oAuth2Client.getToken(code, (error : Error, token: any) => {
      if (error) {
        console.error('Error retrieving access token:', error);
        return;
      }

      oAuth2Client.setCredentials(token);
      fs.writeFileSync('token.json', JSON.stringify(token));
      callback(oAuth2Client);
    });
  });
}

async function getEmailLabelCount(gmail: any, labelId: string): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    gmail.users.labels.get({
      userId: 'me',
      id: labelId,
    }, (error: any, res: any) => {
      if (error) {
        reject(`Error retrieving ${labelId} label: ${error.message}`);
      } else {
        const label = res.data;
        resolve(label.messagesTotal);
      }
    });
  });
}

async function fetchAndPrintEmailCarbonFootprint(auth: any): Promise<void> {
  const gmail = google.gmail({ version: 'v1', auth });
  const inboxEmailCount: number = await getEmailLabelCount(gmail, 'INBOX');
  const sentEmailCount: number = await getEmailLabelCount(gmail, 'SENT');
  const spamEmailCount: number = await getEmailLabelCount(gmail, 'SPAM');

  const userCarbonFootprint = new UserCarbonFootprint(
    'kaushikjain1111@gmail.com',
    spamEmailCount,
    sentEmailCount,
    inboxEmailCount
  );
  userCarbonFootprint.printUserCarbonFootprint();
}

function CarbonFootprint(): void {
  const typeInputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  typeInputInterface.question('Enter Type (Email/Server): ', async (type: string) => {
    typeInputInterface.close();
    if(type.toLowerCase()=== 'email'){
      fs.readFile('credentials.json', (error: any, credentials: { toString: () => string; }) => {
        if (error) return console.error('Error loading client secret file:', error);
    
        authorize(JSON.parse(credentials.toString()), fetchAndPrintEmailCarbonFootprint);
      });
    }
    else if(type.toLowerCase() === 'Server'){
      const serverCarbonFootprint = new ServerCarbonFootprint();
      const numberOfEmail = await serverCarbonFootprint.getNumberOfEmailForServer();
      serverCarbonFootprint.setEmailNumber(numberOfEmail);
      serverCarbonFootprint.printServerCarbonFootprint();
    }
    else{
      console.log('Incorrect Input, Please Try Again!')
    }
  });
}

CarbonFootprint();
