import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../auth.service';
import { AuthFormType } from '../models/auth-form-type';

@Component({
  selector: 'ace-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent {
  FormType = AuthFormType;
  currentForm = AuthFormType.LOGIN;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  passwordResetForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required]],
    });
    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get loginEmail(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get loginPassword(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  get registrationEmail(): AbstractControl | null {
    return this.registrationForm.get('email');
  }

  get registrationUsername(): AbstractControl | null {
    return this.registrationForm.get('username');
  }

  get registrationPassword(): AbstractControl | null {
    return this.registrationForm.get('password');
  }

  get registrationPasswordConfirmation(): AbstractControl | null {
    return this.registrationForm.get('passwordConfirmation');
  }

  get passwordResetEmail(): AbstractControl | null {
    return this.passwordResetForm.get('email');
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

  onRegistration(): void {
    if (
      this.registrationForm.value.password !==
      this.registrationForm.value.passwordConfirmation
    ) {
      this.registrationForm.controls.passwordConfirmation.setErrors({
        notMatching: true,
      });
    }
    if (this.registrationForm.valid) {
      this, this.authService.register(this.registrationForm.value);
    }
  }

  onPasswordReset(): void {
    if (this.passwordResetForm.valid) {
      this.authService.resetPassword(this.passwordResetForm.value);
    }
  }

  onRegistrationMode(event: Event): void {
    event.preventDefault();
    this.currentForm = AuthFormType.REGISTRATION;
  }

  onLoginMode(event: Event): void {
    event.preventDefault();
    this.currentForm = AuthFormType.LOGIN;
  }

  onPasswordResetMode(event: Event): void {
    event.preventDefault();
    this.currentForm = AuthFormType.PASSWORD_RESET;
  }
}
