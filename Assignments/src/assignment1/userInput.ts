import readline from "readline";

export class UserInput {
  static async getUserInput(question: string): Promise<string> {
    const inputInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      inputInterface.question(question, (userInput: string) => {
        inputInterface.close();
        resolve(userInput);
      });
    });
  }
}
