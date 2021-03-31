import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ace-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent implements OnInit {
  confirmationForm!: FormGroup;
  isLoading$!: Observable<boolean>;
  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  get email(): AbstractControl | null {
    return this.confirmationForm.get('email');
  }

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
    const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.confirmationForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    });
  }

  onResendConfirmation(): void {
    if (this.confirmationForm.valid) {
      this.subscription = this.authService
        .resendConfirmation(this.confirmationForm.value)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            const message = err.error.message;
            if (message === 'invalid credentials') {
              this.confirmationForm.controls.email.setErrors({
                invalidCredentials: true,
              });
            }
            if (message === 'user confirmed') {
              this.confirmationForm.controls.email.setErrors({
                userConfirmed: true,
              });
            }
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.router.navigate(['about']);
          this.snackbar.open(
            'Am trimis un link de confirmare pe adresa de email specificiată',
            'OK'
          );
        });
    }
  }
}
