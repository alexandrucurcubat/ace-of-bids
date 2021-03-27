import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AuthComponent } from 'src/app/auth/auth.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../models/user';
import { LoadingService } from '../../services/loading/loading.service';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { Theme, ThemingService } from '../../services/theming/theming.service';

@Component({
  selector: 'ace-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  ThemeEnum = Theme;
  theme$!: Observable<Theme>;
  isLoading$!: Observable<boolean>;
  loggedUser$!: Observable<User | null>;

  constructor(
    private sidenavService: SidenavService,
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

  onCloseSidenav(): void {
    this.sidenavService.close();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
