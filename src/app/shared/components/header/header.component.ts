import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthComponent } from 'src/app/auth/auth.component';
import { User } from '../../models/user';
import { LoadingService } from '../../services/loading/loading.service';
import { Theme, ThemingService } from '../../services/theming/theming.service';

@Component({
  selector: 'ace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  ThemeEnum = Theme;
  theme$!: Observable<Theme>;
  isLoading$!: Observable<boolean>;
  loggedUser$!: Observable<User | null>;
  sidenavIsOpened = false;

  constructor(
    private themingService: ThemingService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
    this.authService.autoLogin();
    this.loggedUser$ = this.authService.loggedUser$;
    this.theme$ = this.themingService.theme$;
  }

  onChangeTheme(theme: Theme): void {
    this.themingService.changeTheme(theme);
  }

  onOpenAuthDialog(): void {
    this.matDialog.open(AuthComponent);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
