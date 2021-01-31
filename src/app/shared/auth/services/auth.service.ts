import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE } from '../../models/local-storage';
import { User } from '../../models/user';
import {
  LoginData,
  RegistrationData,
  PasswordResetData,
} from '../models/auth-form-data';
import { AuthResponse } from '../models/auth-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  private tokenTimer: any;
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginData: LoginData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/users/login`, loginData)
      .pipe(
        tap((authResponse: AuthResponse) => {
          console.log(authResponse);
          const token = authResponse.token;
          const expiresIn = authResponse.expiresIn;
          this.loggedUserSubject.next(this.jwtHelper.decodeToken(token).user);
          this.setAuthTimer(expiresIn);
          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
        }),
        catchError((err) => {
          console.log(err);
          return EMPTY;
        })
      );
  }

  autoLogin(): void {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.loggedUserSubject.next(this.jwtHelper.decodeToken(token).user);
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      if (expirationDate) {
        this.resumeAuthTimer(expirationDate.toISOString());
      }
    }
  }

  logout(): void {
    this.loggedUserSubject.next(null);
    clearTimeout(this.tokenTimer);
    localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
  }

  register(registrationData: RegistrationData): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/users/register`, registrationData)
      .pipe(
        tap((user: User) => {
          console.log(user);
        }),
        catchError((err) => {
          console.log(err);
          return EMPTY;
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.get(LOCAL_STORAGE.ACCESS_TOKEN);
    return !this.jwtHelper.isTokenExpired(token);
  }

  resetPassword(passwordResetData: PasswordResetData): void {
    console.log('passwordReset', passwordResetData);
  }

  getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  }

  private setAuthTimer(expiresIn: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }

  private resumeAuthTimer(expirationDate: string | null): void {
    if (expirationDate) {
      const expiresIn =
        (new Date(expirationDate).getTime() - new Date().getTime()) / 1000;
      if (expiresIn > 0) {
        this.setAuthTimer(expiresIn);
      }
    }
  }
}
