import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { PasswordData, UsernameData } from '../models/account-form-data';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'ace-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  loggedUser$!: Observable<User | null>;
  loggedUser!: User;
  isLoading$!: Observable<boolean>;
  accountForm!: FormGroup;
  updateable = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
    this.loggedUser$ = this.authService.loggedUser$.pipe(
      tap((user: User | null) => {
        if (user) {
          this.loggedUser = user;
        }
        this.accountForm.controls.username.setValue(user?.username);
      })
    );
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.minLength(6)],
      newPasswordConfirmation: { value: '', disabled: true },
    });
    this.accountForm.valueChanges.subscribe((form) => {
      form.oldPassword?.trim() !== ''
        ? (this.updateable = true)
        : (this.updateable = false);
      form.newPassword?.trim() !== ''
        ? this.newPasswordConfirmation?.enable({ emitEvent: false })
        : this.newPasswordConfirmation?.disable({ emitEvent: false });
    });
  }

  get username(): AbstractControl | null {
    return this.accountForm.get('username');
  }

  get oldPassword(): AbstractControl | null {
    return this.accountForm.get('oldPassword');
  }

  get newPassword(): AbstractControl | null {
    return this.accountForm.get('newPassword');
  }

  get newPasswordConfirmation(): AbstractControl | null {
    return this.accountForm.get('newPasswordConfirmation');
  }

  updateUser(): void {
    if (this.newPassword?.value !== this.newPasswordConfirmation?.value) {
      this.newPasswordConfirmation?.setErrors({ notMatching: true });
    }
    if (this.accountForm.valid) {
      const id = this.loggedUser.id;
      const usernameData: UsernameData = {
        oldPassword: this.oldPassword?.value,
        username: this.username?.value,
      };
      this.accountService
        .updateUsername(id, usernameData)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            const message = err.error.message;
            this.setErrorMessage(message);
            return EMPTY;
          })
        )
        .subscribe();

      if (this.newPassword && this.newPassword.value.trim() !== '') {
        const passwordData: PasswordData = {
          oldPassword: this.oldPassword?.value,
          newPassword: this.newPassword?.value,
        };
        this.accountService
          .updatePassword(id, passwordData)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              const message = err.error.message;
              this.setErrorMessage(message);
              return EMPTY;
            })
          )
          .subscribe(() => {
            this.newPassword?.reset();
            this.newPassword?.setValue('');
            this.newPasswordConfirmation?.reset();
            this.newPasswordConfirmation?.setValue('');
            this.newPasswordConfirmation?.disable({ emitEvent: false });
            this.oldPassword?.setValue(passwordData.newPassword);
            this.snackbar.open('Parolă actualizată cu succes.', 'OK');
          });
      }
    }
  }

  private setErrorMessage(message: string): void {
    switch (message) {
      case 'invalid credentials':
        this.accountForm.controls.oldPassword.setErrors({
          invalidCredentials: true,
        });
        break;
      case 'username exists':
        this.accountForm.controls.username.setErrors({
          usernameExists: true,
        });
        break;
      default:
        this.snackbar.open(
          'Ceva nu a funcționat cum trebuie. Problema se investighează.',
          'OK'
        );
        console.log(message);
    }
  }
}
