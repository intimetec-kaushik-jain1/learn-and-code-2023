import readline = require("readline");
import { SERVER_EMISSION_RATE } from "./constants";

export class ServerCarbonFootprintCalculator {
  static calculate(numberOfEmail: number): number {
    return numberOfEmail * SERVER_EMISSION_RATE;
  }
}
export class ServerCarbonFootprintPrinter {
  static printData(numberOfEmail: number): void {
    console.log("-------------OUTPUT-------------");
    console.log(
      "Total Server Carbon Footprint: " +
        ServerCarbonFootprintCalculator.calculate(numberOfEmail) +
        " KG"
    );
  }
}

export class ServerEmailInputHandler {
  static async getNumberOfEmail(): Promise<number> {
    const emailCountInputInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<number>((resolve) => {
      emailCountInputInterface.question(
        "Enter number of emails: ",
        (numberOfEmail: string) => {
          emailCountInputInterface.close();
          resolve(Number(numberOfEmail));
        }
      );
    });
  }
}
