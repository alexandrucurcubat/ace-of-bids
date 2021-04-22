import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IUser } from 'common/models/user.interface';
import { LocalStorage } from 'common/models/local-storage.enum';
import { UpdatePasswordDto } from 'common/dto/update-password.dto';
import { UpdateUsernameDto } from 'common/dto/update-username.dto';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageSrvice } from 'src/app/shared/services/local-storage/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private localStorageService: LocalStorageSrvice
  ) {}

  updateUsername(
    id: number,
    usernameData: UpdateUsernameDto
  ): Observable<IUser> {
    return this.http
      .post<IUser>(
        `${environment.apiUrl}/api/auth/update/username/${id}`,
        usernameData
      )
      .pipe(
        tap((user: IUser) => {
          this.authService.updateLoggedUser(user);
          if (user.jwt) {
            this.localStorageService.setItem(LocalStorage.JWT, user.jwt);
          }
        })
      );
  }

  updatePassword(
    id: number,
    passwordData: UpdatePasswordDto
  ): Observable<IUser> {
    return this.http.post<IUser>(
      `${environment.apiUrl}/api/auth/update/password/${id}`,
      passwordData
    );
  }
}
