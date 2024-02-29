import Constants from "./constants";
import { Input } from "./input";
import { Output } from "./output";
import { Validator } from "./validator";

interface IKaprekarRoutine {
  findKaprekarIterations(): Promise<void>;
  calculateNumberOfIterations(inputNumber: number): number;
  addLeadingZeroes(userInput: string): string;
  getAscendingOrderNumber(currentNumberString: string): number;
  getDecendingOrderNumber(currentNumberString: string): number;
}

export class KaprekarRoutine implements IKaprekarRoutine {
  inputNumber: number = 0;

  async findKaprekarIterations(): Promise<void> {
    const input = new Input();
    const output = new Output();
    const validator = new Validator();
    this.inputNumber = parseInt(await input.getUserInput("Enter a number: "));
    const areAllDigitsSame = validator.areAllDigitsSame(this.inputNumber);
    const isInputValid = validator.validInput(this.inputNumber);
    if (areAllDigitsSame || !isInputValid) {
      output.printErrorOutput(areAllDigitsSame, isInputValid);
    } else {
      const numberOfIterations = this.calculateNumberOfIterations(
        this.inputNumber
      );
      output.printIterationOutput(numberOfIterations);
    }
  }

  calculateNumberOfIterations(inputNumber: number): number {
    let numberOfIterations: number = 0;
    let currentNumber = inputNumber;
    while (currentNumber !== Constants.KAPREKAR_CONSTANT) {
      currentNumber = parseInt(this.addLeadingZeroes(currentNumber.toString()));
      currentNumber =
        this.getDecendingOrderNumber(currentNumber.toString()) -
        this.getAscendingOrderNumber(currentNumber.toString());
      numberOfIterations++;
    }
    return numberOfIterations;
  }

  addLeadingZeroes(userInput: string): string {
    const zerosToAdd = Math.max(
      0,
      Constants.DIGITS_OF_KAPREKAR_CONSTANT - userInput.length
    );
    for (let i = Constants.INITIAL_NUMBER_OF_ITERATION; i < zerosToAdd; i++) {
      userInput = userInput + "0";
    }
    return userInput;
  }

  getAscendingOrderNumber(currentNumberString: string): number {
    return parseInt([...currentNumberString].sort().join(""));
  }

  getDecendingOrderNumber(currentNumberString: string): number {
    const descendingNumber = parseInt(
      [...currentNumberString]
        .sort(
          (firstDigit: string, secondDigit: string) =>
            Number(secondDigit) - Number(firstDigit)
        )
        .join("")
    );
    return descendingNumber;
  }
}
