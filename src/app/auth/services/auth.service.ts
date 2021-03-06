import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {
  LoginData,
  RegistrationData,
  PasswordResetData,
  EmailConfirmationData,
} from '../models/auth-form-data';
import { User } from 'src/app/shared/models/user';
import { LocalStorage } from 'src/app/shared/models/local-storage';
import { JwtResponse } from '../models/jwt-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  private jwtTimer: any;
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  login(loginData: LoginData): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(`${environment.apiUrl}/auth/login`, loginData)
      .pipe(
        tap((jwtResponse: JwtResponse) => {
          const jwt = jwtResponse.jwt;
          const expirationDate = this.jwtHelper.getTokenExpirationDate(jwt);
          if (expirationDate) {
            this.setJwtTimer(expirationDate.toISOString());
          }
          this.loggedUserSubject.next(this.jwtHelper.decodeToken(jwt).user);
          localStorage.setItem(LocalStorage.JWT, jwt);
        })
      );
  }

  autoLogin(): void {
    const jwt = this.getJwt();
    if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
      this.loggedUserSubject.next(this.jwtHelper.decodeToken(jwt).user);
      const expirationDate = this.jwtHelper.getTokenExpirationDate(jwt);
      if (expirationDate) {
        this.resumeJwtTimer(expirationDate.toISOString());
      }
    }
  }

  logout(): void {
    this.loggedUserSubject.next(null);
    this.router.navigate(['']);
    clearTimeout(this.jwtTimer);
    localStorage.removeItem(LocalStorage.JWT);
  }

  register(registrationData: RegistrationData): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/auth/register`,
      registrationData
    );
  }

  resendConfirmation(
    emailConfirmationData: EmailConfirmationData
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/confirmation/resend`,
      emailConfirmationData
    );
  }

  resetPassword(passwordResetData: PasswordResetData): void {
    console.log('passwordReset', passwordResetData);
  }

  getJwt(): string | null {
    return localStorage.getItem(LocalStorage.JWT);
  }

  updateLoggedUser(user: User): void {
    this.loggedUserSubject.next(user);
  }

  private setJwtTimer(expirationDate: string | null): void {
    if (expirationDate) {
      this.jwtTimer = setTimeout(() => {
        this.logout();
      }, this.expiresIn(expirationDate) * 1000);
    }
  }

  private resumeJwtTimer(expirationDate: string | null): void {
    if (expirationDate) {
      if (this.expiresIn(expirationDate) > 0) {
        this.setJwtTimer(expirationDate);
      }
    }
  }

  private expiresIn(expirationDate: string): number {
    return (new Date(expirationDate).getTime() - new Date().getTime()) / 1000;
  }
}
