import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';
import { User } from '../shared/models/user';
import { LoadingService } from '../shared/services/loading/loading.service';

@Component({
  selector: 'ace-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  loggedUser$!: Observable<User | null>;
  isLoading$!: Observable<boolean>;
  accountForm!: FormGroup;
  updateable = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
    this.loggedUser$ = this.authService.loggedUser$.pipe(
      tap((user: User | null) => {
        this.accountForm.controls.username.setValue(user?.username);
      })
    );
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      oldPassword: ['', Validators.required],
      newPassword: '',
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

  updateAccount(): void {
    if (
      this.newPassword?.value?.trim() !== '' &&
      this.newPassword?.value?.length < 6
    ) {
      this.newPassword?.setErrors({ minlength: true });
    }
    if (
      this.newPassword?.value?.trim() !== '' &&
      this.newPasswordConfirmation?.value?.trim() === ''
    ) {
      this.newPasswordConfirmation.setErrors({ required: true });
    }
    if (
      this.newPassword?.value?.trim() !== '' &&
      this.newPasswordConfirmation?.value?.trim() !== '' &&
      this.newPassword?.value !== this.newPasswordConfirmation?.value
    ) {
      this.newPasswordConfirmation?.setErrors({ notMatching: true });
    }
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
      this.newPassword?.reset();
      this.newPassword?.setValue('');
      this.newPasswordConfirmation?.reset();
      this.newPasswordConfirmation?.setValue('');
      this.newPasswordConfirmation?.disable({ emitEvent: false });
      // TODO usernameExists & invalidPassword validation
      // TODO send req to api -> if res ok update username.value & oldPassword.value with new values
    }
  }
}
