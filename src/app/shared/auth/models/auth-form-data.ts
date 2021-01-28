export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface PasswordResetData {
  email: string;
}
