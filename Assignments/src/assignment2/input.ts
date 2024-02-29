import readline from "readline";

export interface UserInput {
  getUserInput(question: string): Promise<string>;
}

export abstract class AbstractInput implements UserInput {
  abstract getUserInput(question: string): Promise<string>;
}

export class Input implements AbstractInput {
  async getUserInput(question: string): Promise<string> {
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