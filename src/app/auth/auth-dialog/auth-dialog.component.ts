import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
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
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  passwordResetForm!: FormGroup;
  isLoading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private snackbar: MatSnackBar,
    private loadingService: LoadingService,
    private router: Router
  ) {}

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
    const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required]],
    });
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required]],
    });
    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.subs.sink = this.authService
        .login(this.loginForm.value)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            const message = err.error.message;
            this.setErrorMessage(message);
            return EMPTY;
          })
        )
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
        .pipe(
          switchMap(() => this.authService.login(registrationData)),
          catchError((err: HttpErrorResponse) => {
            const message = err.error.message;
            this.setErrorMessage(message);
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.dialogRef.close();
          this.router.navigate(['about']);
          this.snackbar.open('Înregistrare reușită cu succes!', 'OK');
        });
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

  private setErrorMessage(message: string): void {
    switch (message) {
      case 'invalid credentials':
        this.loginForm.controls.password.setErrors({
          invalidCredentials: true,
        });
        break;
      case 'email exists':
        this.registrationForm.controls.email.setErrors({
          emailExists: true,
        });
        break;
      case 'username exists':
        this.registrationForm.controls.username.setErrors({
          usernameExists: true,
        });
        break;
      default:
        this.dialogRef.close();
        this.snackbar.open(
          'Ceva nu a funcționat cum trebuie. Problema se investighează.',
          'OK'
        );
        console.log(message);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
