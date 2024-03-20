export interface UserRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserResponse extends UserRequest {
  _id: string;
}

export type UserRole = "admin" | "user" | "viewer";