import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

export enum FormType {
  LOGIN,
  REGISTRATION,
  PASSWORD_RESET,
}

@Component({
  selector: 'ace-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit {
  FormType = FormType;
  currentForm = FormType.LOGIN;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  passwordResetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required]],
    });
    this.registrationForm = this.fb.group({
      registrationEmail: ['', [Validators.required, Validators.email]],
      registrationUsername: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      registrationPassword: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      registrationPasswordConfirmation: ['', [Validators.required]],
    });
    this.passwordResetForm = this.fb.group({
      passwordResetEmail: ['', [Validators.required, Validators.email]],
    });
  }

  get loginEmail(): AbstractControl | null {
    return this.loginForm.get('loginEmail');
  }

  get loginPassword(): AbstractControl | null {
    return this.loginForm.get('loginPassword');
  }

  get registrationEmail(): AbstractControl | null {
    return this.registrationForm.get('registrationEmail');
  }

  get registrationUsername(): AbstractControl | null {
    return this.registrationForm.get('registrationUsername');
  }

  get registrationPassword(): AbstractControl | null {
    return this.registrationForm.get('registrationPassword');
  }

  get registrationPasswordConfirmation(): AbstractControl | null {
    return this.registrationForm.get('registrationPasswordConfirmation');
  }

  get passwordResetEmail(): AbstractControl | null {
    return this.passwordResetForm.get('passwordResetEmail');
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  onRegistration(): void {
    if (
      this.registrationForm.value.registrationPassword !==
      this.registrationForm.value.registrationPasswordConfirmation
    ) {
      this.registrationForm.controls.registrationPasswordConfirmation.setErrors(
        {
          notMatching: true,
        }
      );
    }
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }

  onPasswordReset(): void {
    if (this.passwordResetForm.valid) {
      console.log(this.passwordResetForm.value);
    }
  }

  onRegistrationMode(event: Event): void {
    event.preventDefault();
    this.currentForm = FormType.REGISTRATION;
  }

  onLoginMode(event: Event): void {
    event.preventDefault();
    this.currentForm = FormType.LOGIN;
  }

  onPasswordResetMode(event: Event): void {
    event.preventDefault();
    this.currentForm = FormType.PASSWORD_RESET;
  }
}
