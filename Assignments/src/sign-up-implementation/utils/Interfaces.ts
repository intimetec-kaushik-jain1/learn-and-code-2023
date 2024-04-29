export interface UserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  createUser(user: UserRequest): Promise<string>;
  populateDefaultData(userRole: UserRole): Promise<string>;
  isUserAlreadyExist(user: UserRequest): Promise<string>;
}

export interface UserResponse extends UserRequest {
  _id: string;
}

export type UserRole = "admin" | "user" | "viewer";
