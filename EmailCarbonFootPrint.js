"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var readline = require("readline");
var UserCarbonFootprint = /** @class */ (function () {
    function UserCarbonFootprint(emailAddress, spamEmailCount, sentEmailCount, inboxEmailCount) {
        this.inboxCarbonEmissionRate = 0.3;
        this.sentCarbonEmissionRate = 0.3;
        this.spamCarbonEmissionRate = 0.03;
        this.emailAddress = emailAddress;
        this.spamEmailCount = spamEmailCount;
        this.sentEmailCount = sentEmailCount;
        this.inboxEmailCount = inboxEmailCount;
    }
    UserCarbonFootprint.prototype.getEmailDomain = function () {
        var emailDomain = this.emailAddress.split("@")[1].split(".")[0];
        var validDomains = ["gmail", "outlook", "yahoo"];
        if (validDomains.includes(emailDomain)) {
            return emailDomain;
        }
        return "Invalid Domain";
    };
    UserCarbonFootprint.prototype.printUserCarbonFootprint = function () {
        console.log("-------------OUTPUT-------------");
        var emailDomain = this.getEmailDomain();
        if (emailDomain !== "Invalid Domain") {
            var inboxCarbonFootprint = (this.inboxEmailCount * this.inboxCarbonEmissionRate) / 1000;
            var sentCarbonFootprint = (this.sentEmailCount * this.sentCarbonEmissionRate) / 1000;
            var spamCarbonFootprint = (this.spamEmailCount * this.spamCarbonEmissionRate) / 1000;
            var totalCarbonFootprint = inboxCarbonFootprint + sentCarbonFootprint + spamCarbonFootprint;
            console.log("Domain: " + emailDomain);
            console.log("Inbox Carbon Footprint: " + inboxCarbonFootprint + "KG");
            console.log("Sent Carbon Footprint: " + sentCarbonFootprint + "KG");
            console.log("Spam Carbon Footprint: " + spamCarbonFootprint + "KG");
            console.log("Total Consumption: " + totalCarbonFootprint + "KG");
        }
        else {
            console.log("Invalid email");
        }
    };
    return UserCarbonFootprint;
}());
var ServerCarbonFootprint = /** @class */ (function () {
    function ServerCarbonFootprint(numberOfEmail) {
        this.numberOfEmail = numberOfEmail;
    }
    ServerCarbonFootprint.prototype.printServerCarbonFootprint = function () {
        console.log("-------------OUTPUT-------------");
        console.log("Total Server Carbon Footprint: " + this.numberOfEmail * 0.02 + "KG");
    };
    return ServerCarbonFootprint;
}());
var userInfos = [];
function fetchUserData() {
    return __awaiter(this, void 0, void 0, function () {
        var apiURL, fetchedInfo, fetchedData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    apiURL = 'https://api.jsonbin.io/v3/b/654887aa12a5d37659957bd1';
                    return [4 /*yield*/, axios_1.default.get(apiURL)];
                case 1:
                    fetchedInfo = _a.sent();
                    if (fetchedInfo.status === 200) {
                        fetchedData = fetchedInfo.data;
                        userInfos = fetchedData.record;
                    }
                    else {
                        console.error('Failed to fetch user data');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching user data:', error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getEmailAddressInput() {
    return __awaiter(this, void 0, void 0, function () {
        var emailAddressInputInterface;
        return __generator(this, function (_a) {
            emailAddressInputInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            return [2 /*return*/, new Promise(function (resolve) {
                    emailAddressInputInterface.question('Enter an email address: ', function (emailAddress) {
                        emailAddressInputInterface.close();
                        resolve(emailAddress);
                    });
                })];
        });
    });
}
function getNumberOfEmailForServer() {
    return __awaiter(this, void 0, void 0, function () {
        var emailCountInputInterface;
        return __generator(this, function (_a) {
            emailCountInputInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            return [2 /*return*/, new Promise(function (resolve) {
                    emailCountInputInterface.question('Enter number of emails: ', function (numberOfEmail) {
                        emailCountInputInterface.close();
                        resolve(Number(numberOfEmail));
                    });
                })];
        });
    });
}
function emailCarbonFootprint() {
    return __awaiter(this, void 0, void 0, function () {
        var emailAddress, user, spamEmailCount, inboxEmailCount, sentEmailCount, userCarbonFootprint, numberOfEmail, serverCarbonFootprint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchUserData()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getEmailAddressInput()];
                case 2:
                    emailAddress = _a.sent();
                    user = userInfos.find(function (user) { return user.email === emailAddress; });
                    if (!user) return [3 /*break*/, 3];
                    spamEmailCount = user.spam;
                    inboxEmailCount = user.inbox;
                    sentEmailCount = user.sent;
                    if (emailAddress.includes("@")) {
                        userCarbonFootprint = new UserCarbonFootprint(emailAddress, spamEmailCount, sentEmailCount, inboxEmailCount);
                        userCarbonFootprint.printUserCarbonFootprint();
                    }
                    else {
                        console.log('Email address not found in the data.');
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, getNumberOfEmailForServer()];
                case 4:
                    numberOfEmail = _a.sent();
                    serverCarbonFootprint = new ServerCarbonFootprint(numberOfEmail);
                    serverCarbonFootprint.printServerCarbonFootprint();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
emailCarbonFootprint();
