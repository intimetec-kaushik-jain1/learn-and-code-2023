import Constants from "./constants";
import { Output } from "./output";
import { Input } from "./input";

export class KaprekarRoutine {
  static inputNumber: number = 0;

  static async findKaprekarIterations() {
    this.inputNumber = parseInt(await Input.getUserInput("Enter a number: "));
    Output.printOutput();
  }

  static calculateNumberOfIterations(inputNumber: number): number {
    let numberOfIterations: number = 0;
    let currentNumber = inputNumber;
    while (currentNumber !== Constants.KAPREKAR_CONSTANT) {
      currentNumber = parseInt(this.addLeadingZeroes(currentNumber.toString()));
      currentNumber =
        this.getOrderedNumber(currentNumber.toString(), "descending") -
        this.getOrderedNumber(currentNumber.toString(), "ascending");
      numberOfIterations = numberOfIterations + Constants.ONE;
    }
    return numberOfIterations;
  }

  static addLeadingZeroes(userInput: string): string {
    const zerosToAdd = Math.max(
      Constants.ZERO,
      Constants.DIGITS_OF_KAPREKAR_CONSTANT - userInput.length
    );
    for (let i = Constants.INITIAL_NUMBER_OF_ITERATION; i < zerosToAdd; i++) {
      userInput = userInput + "0";
    }
    return userInput;
  }

  static getOrderedNumber(
    currentNumberString: string,
    order: "ascending" | "descending"
  ): number {
    if (order === "ascending") {
      const ascendingNumber = parseInt(
        [...currentNumberString].sort().join("")
      );
      return ascendingNumber;
    } else {
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

}

KaprekarRoutine.findKaprekarIterations();
