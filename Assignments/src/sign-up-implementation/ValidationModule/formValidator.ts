import { Validator } from "validator.ts/Validator";
import { UserRequest } from "../utils/Interfaces";
import { ValidationErrorInterface } from "validator.ts/ValidationErrorInterface";
import { CONSTANTS } from "../utils/constants";

export class FormValidator {
  static getValidationErrors(user: UserRequest): ValidationErrorInterface[] {
    const validator = new Validator();
    const validationErrors: ValidationErrorInterface[] =
      validator.validate(user);
    return validationErrors;
  }

  static printValidationError(user: UserRequest) {
    const errors = FormValidator.getValidationErrors(user);
    errors.forEach((error) => {
      console.log(
        `${CONSTANTS.Error} : Property: ${error.property}, Error Message: ${error.errorName}`
      );
    });
  }
}
