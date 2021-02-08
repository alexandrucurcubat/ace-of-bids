import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { LOCAL_STORAGE } from 'src/app/shared/models/local-storage';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { PasswordData, UsernameData } from '../models/account-form-data';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  updateUsername(id: number, usernameData: UsernameData): Observable<User> {
    return this.http
      .post<User>(
        `${environment.apiUrl}/auth/update/username/${id}`,
        usernameData
      )
      .pipe(
        tap((user: User) => {
          this.authService.updateLoggedUser(user);
          if (user.jwt) {
            localStorage.setItem(LOCAL_STORAGE.JWT, user.jwt);
          }
        })
      );
  }

  updatePassword(id: number, passwordData: PasswordData): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/auth/update/password/${id}`,
      passwordData
    );
  }
}
