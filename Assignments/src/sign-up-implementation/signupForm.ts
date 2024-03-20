import { SignupAPI } from "./APIModule/signupAPI";
import { FormValidator } from "./ValidationModule/formValidator";
import { User } from "./UserModule/user";
import dotenv = require("dotenv");
import { RESPONSE_MESSAGE } from "./utils/contants";
import { UserRole } from "./utils/Interfaces";
class UserSignupProcess {
  constructor() {
    dotenv.config();
  }

  async initiateSignupProcess() {
    try {
      const user = this.createUser();
      this.validateUser(user);
      await this.signUpUser(user);
    } catch (error) {
      console.error(RESPONSE_MESSAGE.signupFailure, error);
    }
  }

  private createUser(): User {
    const user = new User();
    user.name = "tike ow";
    user.email = "tikewow407@azduan.com";
    user.password = "123445";
    user.role = "user";
    return user;
  }

  private validateUser(user: User): void {
    const errors = FormValidator.getValidationErrors(user);
    if (errors.length > 0) {
      FormValidator.printValidationError(user);
      throw new Error("Validation failed");
    }
  }

  private async signUpUser(user: User): Promise<void> {
    const signupAPI = new SignupAPI();
    await signupAPI.signup(user);
  }
}

const userSignupProcess = new UserSignupProcess();
userSignupProcess.initiateSignupProcess();
