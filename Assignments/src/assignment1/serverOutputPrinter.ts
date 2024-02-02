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
