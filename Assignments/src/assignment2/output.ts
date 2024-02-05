import { KaprekarRoutine } from ".";
import { Validator } from "./validator";

export class Output {
  static printOutput() {
    return !Validator.areAllDigitsSame(KaprekarRoutine.inputNumber)
      ? Validator.validateInput(KaprekarRoutine.inputNumber)
        ? console.log(
          "Number of Iterations: " +
              KaprekarRoutine.calculateNumberOfIterations(
                KaprekarRoutine.inputNumber
              )
        )
        : console.log("Invalid Input")
      : console.log("All Digits are same, Please Try with some other Input!");
  }
}
