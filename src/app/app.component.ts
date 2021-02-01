import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TdDialogService } from '@covalent/core/dialogs';

import {
  Themes,
  ThemingService,
} from './shared/ui/theming/services/theming.service';
import { AuthDialogComponent } from './shared/auth/auth-dialog/auth-dialog.component';
import { environment } from 'src/environments/environment';
import { Environment } from './shared/models/environment';
import { version } from '../../package.json';
import { AuthService } from './shared/auth/services/auth.service';
import { User } from './shared/models/user';
import { LoadingService } from './core/loading/loading.service';

@Component({
  selector: 'ace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  themeClass: Themes = Themes.LIGHT_THEME;
  ThemesEnum = Themes;
  themingSubscription = new Subscription();
  isLoading$!: Observable<boolean>;
  loggedUser$!: Observable<User | null>;
  environment!: Environment;

  constructor(
    private dialog: MatDialog,
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer,
    private dialogService: TdDialogService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: Themes) => {
        this.themeClass = theme;
        this.applyThemeOnOverlays();
      }
    );
    this.isLoading$ = this.loadingService.isLoading$;
    this.loggedUser$ = this.authService.loggedUser$;
    this.authService.autoLogin();
    this.environment = environment;
  }

  onOpenAuthDialog(): void {
    const authDialog = this.dialog.open(AuthDialogComponent);
    authDialog.updatePosition({ top: '100px' });
  }

  onChangeTheme(theme: Themes): void {
    this.themingService.changeTheme(theme);
  }

  onLogout(): void {
    this.authService.logout();
  }

  onDEV(): void {
    this.dialogService.openAlert({
      message: `Versiune aplicație: ${version}`,
      title: 'DEV',
      closeButton: 'OK',
    });
  }

  private applyThemeOnOverlays(): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.themeClass);
  }

  ngOnDestroy(): void {
    this.themingSubscription.unsubscribe();
  }
}
