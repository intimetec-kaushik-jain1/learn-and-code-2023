export interface OutputPrinter {
  printErrorOutput(areAllDigitsSame: boolean, isInputValid: boolean): void;
  printIterationOutput(numberOfIterations: number): void;
}

export abstract class AbstractOutput implements OutputPrinter {
  abstract printErrorOutput(
    areAllDigitsSame: boolean,
    isInputValid: boolean
  ): void;
  abstract printIterationOutput(numberOfIterations: number): void;
}

export class Output implements AbstractOutput {
  printErrorOutput(areAllDigitsSame: boolean, isInputValid: boolean): void {
    if (areAllDigitsSame === true) {
      console.log("All Digits are same, Please Try with some other Input!");
    } else if (!isInputValid) {
      console.log("Invalid Input");
    }
  }
  printIterationOutput(numberOfIterations: number): void {
    console.log("Number of Iterations: " + numberOfIterations);
  }
}
