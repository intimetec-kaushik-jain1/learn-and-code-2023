#include <iostream>
#include <string>
using namespace std;

struct Email {
    string emailAddress;
    int spamCount;
    int sentCount;
    int inboxCount;

     string getEmailDomain() const {
        int atrPostion = emailAddress.find('@');
        int dotPostion = emailAddress.find('.');
        if (atrPostion !=  string::npos && dotPostion !=  string::npos) {
             string domain = emailAddress.substr(atrPostion + 1, dotPostion - atrPostion - 1);
            if (!domain.empty()) {
                return domain;
            }
        }
        return "Invalid Domain";
    }

    void printCarbonFootprint()  {
        cout<<"-------------OUTPUT--------"<<endl;
        if (getEmailDomain() != "Invalid") {
             cout << "Email Address: " << emailAddress <<  endl;
             cout << "Domain: " << getEmailDomain() <<  endl;
             cout << "Inbox: " << (inboxCount * 8.65)/1000 << "KG"<<  endl; // (17 + 0.3)/2
             cout << "Sent: " << (sentCount * 0.3)/1000 << "KG"<<  endl;
             cout << "Spam: " << (spamCount * 0.03)/1000 << "KG"<<  endl;
        } else {
             cout << "Invalid email" <<  endl;
        }
    }
};

int main() {
    Email entity;
    cout << "Enter Email Address: ";
    cin >> entity.emailAddress;
    cout << "Enter the number of Spam mails: ";
    cin >> entity.spamCount;
    cout << "Enter the number of Inbox mails: ";
    cin >> entity.inboxCount;
    cout << "Enter the number of Sent mails: ";
    cin >> entity.sentCount;
    entity.printCarbonFootprint();
    return 0;
}
