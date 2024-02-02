import { CarbonFootprintManager } from "./carbonFootprintManager";
import { UserInput } from "./userInput";

export class CarbonFootPrint {
  static async carbonFootprint(): Promise<void> {
    const type = await UserInput.getUserInput("Enter Type (Email/Server): ");

    if (type.toLowerCase() === "email") {
      await CarbonFootprintManager.processEmailType();
    } else if (type.toLowerCase() === "server") {
      await CarbonFootprintManager.processServerType();
    } else {
      console.log("Incorrect Input, Please Try Again!");
    }
  }
}

CarbonFootPrint.carbonFootprint();
