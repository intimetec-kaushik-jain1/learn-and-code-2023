var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var google = require("googleapis").google;
var readline = require("readline");
var fs = require("fs");
var SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.labels",
];
var GmailLabelCounter = /** @class */ (function () {
    function GmailLabelCounter() {
    }
    GmailLabelCounter.getCount = function (gmail, labelId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        gmail.users.labels.get({
                            userId: "me",
                            id: labelId,
                        }, function (error, labelResponse) {
                            if (error) {
                                reject("Error retrieving ".concat(labelId, " label: ").concat(error.message));
                            }
                            else {
                                var label = labelResponse === null || labelResponse === void 0 ? void 0 : labelResponse.data;
                                if (label && label.messagesTotal !== undefined) {
                                    resolve(label.messagesTotal);
                                }
                                else {
                                    reject("Label or messagesTotal is undefined");
                                }
                            }
                        });
                    })];
            });
        });
    };
    return GmailLabelCounter;
}());
var EmailCarbonFootprintCalculator = /** @class */ (function () {
    function EmailCarbonFootprintCalculator() {
    }
    EmailCarbonFootprintCalculator.calculate = function (inboxCount, sentCount, spamCount) {
        var inboxEmissionRate = 0.3;
        var sentEmissionRate = 0.3;
        var spamEmissionRate = 0.03;
        var inboxCarbonFootprint = (inboxCount * inboxEmissionRate) / 1000;
        var sentCarbonFootprint = (sentCount * sentEmissionRate) / 1000;
        var spamCarbonFootprint = (spamCount * spamEmissionRate) / 1000;
        return inboxCarbonFootprint + sentCarbonFootprint + spamCarbonFootprint;
    };
    return EmailCarbonFootprintCalculator;
}());
var EmailCarbonFootprintPrinter = /** @class */ (function () {
    function EmailCarbonFootprintPrinter() {
    }
    EmailCarbonFootprintPrinter.printData = function (emailData) {
        console.log("-------------OUTPUT-------------");
        var emailDomain = EmailCarbonFootprintPrinter.extractEmailDomain(emailData.emailAddress);
        if (emailDomain !== "Invalid Domain") {
            EmailCarbonFootprintPrinter.printValidEmailData(emailData, emailDomain);
        }
        else {
            EmailCarbonFootprintPrinter.printInvalidEmail();
        }
    };
    EmailCarbonFootprintPrinter.printValidEmailData = function (emailData, emailDomain) {
        var totalCarbonFootprint = EmailCarbonFootprintCalculator.calculate(emailData.inboxEmailCount, emailData.sentEmailCount, emailData.spamEmailCount);
        console.log("Domain: " + emailDomain);
        console.log("Inbox Carbon Footprint: " +
            (emailData.inboxEmailCount * 0.3) / 1000 +
            " KG");
        console.log("Sent Carbon Footprint: " +
            (emailData.sentEmailCount * 0.3) / 1000 +
            " KG");
        console.log("Spam Carbon Footprint: " +
            (emailData.spamEmailCount * 0.03) / 1000 +
            " KG");
        console.log("Total Consumption: " + totalCarbonFootprint + " KG");
    };
    EmailCarbonFootprintPrinter.printInvalidEmail = function () {
        console.log("Invalid email");
    };
    EmailCarbonFootprintPrinter.extractEmailDomain = function (emailAddress) {
        var _a;
        var emailDomain = (_a = emailAddress.split("@")[1]) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        var validDomains = ["gmail", "outlook", "yahoo"];
        if (validDomains.includes(emailDomain)) {
            return emailDomain;
        }
        return "Invalid Domain";
    };
    return EmailCarbonFootprintPrinter;
}());
var ServerCarbonFootprintCalculator = /** @class */ (function () {
    function ServerCarbonFootprintCalculator() {
    }
    ServerCarbonFootprintCalculator.calculate = function (numberOfEmail) {
        return numberOfEmail * 0.02;
    };
    return ServerCarbonFootprintCalculator;
}());
var ServerCarbonFootprintPrinter = /** @class */ (function () {
    function ServerCarbonFootprintPrinter() {
    }
    ServerCarbonFootprintPrinter.printData = function (numberOfEmail) {
        console.log("-------------OUTPUT-------------");
        console.log("Total Server Carbon Footprint: " +
            ServerCarbonFootprintCalculator.calculate(numberOfEmail) +
            " KG");
    };
    return ServerCarbonFootprintPrinter;
}());
var ServerEmailInputHandler = /** @class */ (function () {
    function ServerEmailInputHandler() {
    }
    ServerEmailInputHandler.getNumberOfEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var emailCountInputInterface;
            return __generator(this, function (_a) {
                emailCountInputInterface = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                return [2 /*return*/, new Promise(function (resolve) {
                        emailCountInputInterface.question("Enter number of emails: ", function (numberOfEmail) {
                            emailCountInputInterface.close();
                            resolve(Number(numberOfEmail));
                        });
                    })];
            });
        });
    };
    return ServerEmailInputHandler;
}());
var GmailAuthenticator = /** @class */ (function () {
    function GmailAuthenticator() {
    }
    GmailAuthenticator.authorize = function (credentials, callback) {
        var _a = credentials.web, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
        var oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        var tokenPath = "token.json";
        try {
            var token = fs.readFileSync(tokenPath);
            oAuth2Client.setCredentials(JSON.parse(token.toString()));
            callback(oAuth2Client);
        }
        catch (error) {
            GmailAuthenticator.getAccessToken(oAuth2Client, function (auth) {
                callback(auth);
            });
        }
    };
    GmailAuthenticator.getAccessToken = function (oAuth2Client, callback) {
        var authUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
        });
        console.log("Visit this URL to authorize the app:", authUrl);
        var userInputInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        userInputInterface.question("Enter the code from the page here: ", function (code) {
            userInputInterface.close();
            oAuth2Client.getToken(code, function (error, token) {
                if (error) {
                    console.error("Error retrieving access token:", error);
                    return;
                }
                oAuth2Client.setCredentials(token);
                fs.writeFileSync("token.json", JSON.stringify(token));
                callback(oAuth2Client);
            });
        });
    };
    return GmailAuthenticator;
}());
var CarbonFootprintManager = /** @class */ (function () {
    function CarbonFootprintManager() {
    }
    CarbonFootprintManager.fetchAndPrintEmailCarbonFootprint = function (auth) {
        return __awaiter(this, void 0, void 0, function () {
            var gmail, inboxEmailCount, sentEmailCount, spamEmailCount, emailData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gmail = google.gmail({ version: "v1", auth: auth });
                        return [4 /*yield*/, GmailLabelCounter.getCount(gmail, "INBOX")];
                    case 1:
                        inboxEmailCount = _a.sent();
                        return [4 /*yield*/, GmailLabelCounter.getCount(gmail, "SENT")];
                    case 2:
                        sentEmailCount = _a.sent();
                        return [4 /*yield*/, GmailLabelCounter.getCount(gmail, "SPAM")];
                    case 3:
                        spamEmailCount = _a.sent();
                        emailData = {
                            emailAddress: "kaushikjain67890@gmail.com",
                            inboxEmailCount: inboxEmailCount,
                            sentEmailCount: sentEmailCount,
                            spamEmailCount: spamEmailCount,
                        };
                        EmailCarbonFootprintPrinter.printData(emailData);
                        return [2 /*return*/];
                }
            });
        });
    };
    CarbonFootprintManager.processEmailType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, auth, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, CarbonFootprintManager.readCredentialsFile()];
                    case 1:
                        credentials = _a.sent();
                        return [4 /*yield*/, CarbonFootprintManager.authorizeGmail(credentials)];
                    case 2:
                        auth = _a.sent();
                        return [4 /*yield*/, CarbonFootprintManager.fetchAndPrintEmailCarbonFootprint(auth)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CarbonFootprintManager.processServerType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numberOfEmail, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ServerEmailInputHandler.getNumberOfEmail()];
                    case 1:
                        numberOfEmail = _a.sent();
                        ServerCarbonFootprintPrinter.printData(numberOfEmail);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CarbonFootprintManager.readCredentialsFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fs.readFile("credentials.json", function (error, credentials) {
                            if (error) {
                                reject("Error loading client secret file: ".concat(error));
                            }
                            else {
                                resolve(JSON.parse(credentials.toString()));
                            }
                        });
                    })];
            });
        });
    };
    CarbonFootprintManager.authorizeGmail = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        GmailAuthenticator.authorize(credentials, function (auth) {
                            resolve(auth);
                        });
                    })];
            });
        });
    };
    CarbonFootprintManager.getUserInput = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var inputInterface;
            return __generator(this, function (_a) {
                inputInterface = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                return [2 /*return*/, new Promise(function (resolve) {
                        inputInterface.question(question, function (userInput) {
                            inputInterface.close();
                            resolve(userInput);
                        });
                    })];
            });
        });
    };
    CarbonFootprintManager.CarbonFootprint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CarbonFootprintManager.getUserInput("Enter Type (Email/Server): ")];
                    case 1:
                        type = _a.sent();
                        if (!(type.toLowerCase() === "email")) return [3 /*break*/, 3];
                        return [4 /*yield*/, CarbonFootprintManager.processEmailType()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(type.toLowerCase() === "server")) return [3 /*break*/, 5];
                        return [4 /*yield*/, CarbonFootprintManager.processServerType()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        console.log("Incorrect Input, Please Try Again!");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return CarbonFootprintManager;
}());
CarbonFootprintManager.CarbonFootprint();
