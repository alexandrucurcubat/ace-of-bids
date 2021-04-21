import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorage } from 'src/app/shared/models/local-storage';
import { User } from 'src/app/shared/models/user';
import { LocalStorageSrvice } from 'src/app/shared/services/local-storage/local-storage.service';
import { PasswordData, UsernameData } from '../models/account-form-data';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private localStorageService: LocalStorageSrvice
  ) {}

  updateUsername(id: number, usernameData: UsernameData): Observable<User> {
    return this.http
      .post<User>(`api/auth/update/username/${id}`, usernameData)
      .pipe(
        tap((user: User) => {
          this.authService.updateLoggedUser(user);
          if (user.jwt) {
            this.localStorageService.setItem(LocalStorage.JWT, user.jwt);
          }
        })
      );
  }

  updatePassword(id: number, passwordData: PasswordData): Observable<User> {
    return this.http.post<User>(`api/auth/update/password/${id}`, passwordData);
  }
}
