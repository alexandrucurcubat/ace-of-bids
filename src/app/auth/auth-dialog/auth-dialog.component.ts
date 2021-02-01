import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { AuthService } from '../services/auth.service';
import { AuthFormType } from '../models/auth-form-type';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';

@Component({
  selector: 'ace-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  FormType = AuthFormType;
  currentForm = AuthFormType.LOGIN;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  passwordResetForm: FormGroup;
  isLoading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private loadingService: LoadingService
  ) {
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

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.subs.sink = this.authService
        .login(this.loginForm.value)
        .subscribe(() => this.dialogRef.close());
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
      const {
        passwordConfirmation,
        ...registrationData
      } = this.registrationForm.value;
      this.subs.sink = this.authService
        .register(registrationData)
        .pipe(switchMap(() => this.authService.login(registrationData)))
        .subscribe(() => this.dialogRef.close());
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
    this.loginForm.reset();
    this.passwordResetForm.reset();
  }

  onLoginMode(event: Event): void {
    event.preventDefault();
    this.currentForm = AuthFormType.LOGIN;
    this.registrationForm.reset();
    this.passwordResetForm.reset();
  }

  onPasswordResetMode(event: Event): void {
    event.preventDefault();
    this.currentForm = AuthFormType.PASSWORD_RESET;
    this.loginForm.reset();
    this.registrationForm.reset();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
