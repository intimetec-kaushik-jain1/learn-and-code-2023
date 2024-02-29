import Constants from "./constants";

export interface InputValidator {
  validInput(input: number): boolean;
  areAllDigitsSame(input: number): boolean;
}

export class Validator implements InputValidator {
  validInput(input: number): boolean {
    return (
      input >= Constants.KAPREKAR_LOWER_LIMIT &&
      input <= Constants.KAPREKAR_UPPER_LIMIT &&
      !isNaN(input)
    );
  }

  areAllDigitsSame(input: number): boolean {
    return input % 1111 === 0 ? true : false;
  }
}
