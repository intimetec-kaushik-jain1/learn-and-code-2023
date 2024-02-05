import Constants from "./constants";

export class Validator {
  static validateInput(input: number): boolean {
    return (
      input >= Constants.KAPREKAR_LOWER_LIMIT &&
      input <= Constants.KAPREKAR_UPPER_LIMIT &&
      !isNaN(input)
    );
  }

  static areAllDigitsSame(input: number) {
    const inputNumberString = input.toString();
    const firstDigit = inputNumberString[0];
    return inputNumberString.split("").every((digit) => digit === firstDigit);
  }
}
