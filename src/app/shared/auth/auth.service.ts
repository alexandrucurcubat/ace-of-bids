import { Injectable } from '@angular/core';

import {
  LoginData,
  RegistrationData,
  PasswordResetData,
} from './models/auth-form-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(loginData: LoginData): void {
    console.log('login', loginData);
  }

  register(registrationData: RegistrationData): void {
    console.log('registration', registrationData);
  }

  resetPassword(passwordResetData: PasswordResetData): void {
    console.log('passwordReset', passwordResetData);
  }
}
