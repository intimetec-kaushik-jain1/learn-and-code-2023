import readline from "readline";
import Constants from "./constants";

export class KaprekarRoutine {
  static inputNumber: number = 0;
  
  static async findKaprekarIterations() {
    this.inputNumber = parseInt(await this.getUserInput("Enter a number: "));
    this.printOutput();
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

  static is1111ExceptionInput(inputNumber: number) {
    return inputNumber === Constants.EXCEPTION_1111 ? true : false;
  }

  static validateInput(input: number): boolean {
    return (
      input >= Constants.KAPREKAR_LOWER_LIMIT &&
      input <= Constants.KAPREKAR_UPPER_LIMIT &&
      !isNaN(input)
    );
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

  static printOutput() {
    return !this.is1111ExceptionInput(this.inputNumber)
      ? this.validateInput(this.inputNumber)
        ? console.log(
            "Number of Iterations: " +
              this.calculateNumberOfIterations(this.inputNumber)
          )
        : console.log("Invalid Input")
      : console.log("Exception Input");
  }
}

KaprekarRoutine.findKaprekarIterations();
