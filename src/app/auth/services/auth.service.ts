import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginDto } from 'common/dto/login.dto';
import { RegisterDto } from 'common/dto/register.dto';
import { PasswordResetDto } from 'common/dto/password-reset.dto';
import { EmailConfirmationDto } from 'common/dto/email-confirmation.dto';
import { IUser } from 'common/models/user.interface';
import { LocalStorage } from 'common/models/local-storage.enum';
import { IJwtResponse } from 'common/models/jwt-response.interface';
import { LocalStorageSrvice } from 'src/app/shared/services/local-storage/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedUserSubject = new BehaviorSubject<IUser | null>(null);
  private jwtTimer: any;
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private localStorageService: LocalStorageSrvice
  ) {}

  login(loginData: LoginDto): Observable<IJwtResponse> {
    return this.http
      .post<IJwtResponse>(`${environment.apiUrl}/api/auth/login`, loginData)
      .pipe(
        tap((jwtResponse: IJwtResponse) => {
          const jwt = jwtResponse.jwt;
          const expirationDate = this.jwtHelper.getTokenExpirationDate(jwt);
          if (expirationDate) {
            this.setJwtTimer(expirationDate.toISOString());
          }
          this.loggedUserSubject.next(this.jwtHelper.decodeToken(jwt).user);
          this.localStorageService.setItem(LocalStorage.JWT, jwt);
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
    this.localStorageService.removeItem(LocalStorage.JWT);
  }

  register(registrationData: RegisterDto): Observable<IUser> {
    return this.http.post<IUser>(
      `${environment.apiUrl}/api/auth/register`,
      registrationData
    );
  }

  resendConfirmation(
    emailConfirmationData: EmailConfirmationDto
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/confirmation/resend`,
      emailConfirmationData
    );
  }

  resetPassword(passwordResetData: PasswordResetDto): void {
    console.log('passwordReset', passwordResetData);
  }

  getJwt(): string | null {
    return this.localStorageService.getItem(LocalStorage.JWT);
  }

  updateLoggedUser(user: IUser): void {
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
