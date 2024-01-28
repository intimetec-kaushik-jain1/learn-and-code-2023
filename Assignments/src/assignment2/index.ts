import readline from "readline";
import {
  DIGITS_OF_KAPREKAR_CONSTANT,
  EXCEPETION_1111,
  INITIAL_NUMBER_OF_ITERATION,
  KAPREKAR_CONSTANT,
  KAPREKAR_LOWER_LIMIT,
  KAPREKAR_UPPER_LIMIT,
  ONE,
  ZERO,
} from "./contants";

export class KaprekarRoutine {
  static async findKaprekarIterations() {
    const startingNumber: number = parseInt(
      await this.getUserInput("Enter a number: ")
    );
    !this.is1111ExceptionInput(startingNumber)
      ? this.validateInput(startingNumber)
        ? console.log(
            "Number of Iterations: " +
              this.calculateNumberOfIterations(startingNumber)
          )
        : console.log("Invalid Input")
      : console.log("Exception Input");
  }

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

  static is1111ExceptionInput(startingNumber: number) {
    return startingNumber === EXCEPETION_1111 ? true : false;
  }

  static validateInput(input: number): boolean {
    return (
      input >= KAPREKAR_LOWER_LIMIT &&
      input <= KAPREKAR_UPPER_LIMIT &&
      !isNaN(input)
    );
  }

  static calculateNumberOfIterations(startingNumber: number): number {
    let numberOfIterations: number = 0;
    let currentNumber = startingNumber;
    while (currentNumber !== KAPREKAR_CONSTANT) {
      currentNumber = parseInt(this.addLeadingZeroes(currentNumber.toString()));
      currentNumber =
        this.getOrderedNumber(currentNumber.toString(), "descending") -
        this.getOrderedNumber(currentNumber.toString(), "ascending");
      numberOfIterations = numberOfIterations + ONE;
    }
    return numberOfIterations;
  }

  static addLeadingZeroes(userInput: string): string {
    const zerosToAdd = Math.max(
      ZERO,
      DIGITS_OF_KAPREKAR_CONSTANT - userInput.length
    );
    for (let i = INITIAL_NUMBER_OF_ITERATION; i < zerosToAdd; i++) {
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
