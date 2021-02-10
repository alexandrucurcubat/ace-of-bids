import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../models/user';
import { AuthDialogComponent } from 'src/app/auth/auth-dialog/auth-dialog.component';
import { Themes, ThemingService } from '../theming/services/theming.service';

@Component({
  selector: 'ace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedUser$!: Observable<User | null>;
  @Output() changeTheme = new EventEmitter();
  ThemesEnum = Themes;
  themeClass!: Themes;
  themingSubscription = new Subscription();

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private themingService: ThemingService
  ) { }

  ngOnInit(): void {
    this.loggedUser$ = this.authService.loggedUser$;
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: Themes) => (this.themeClass = theme)
    );
  }

  onOpenAuthDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }

  onChangeTheme(theme: Themes): void {
    this.changeTheme.emit(theme);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
