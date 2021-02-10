import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { TdDialogService } from '@covalent/core/dialogs';
import { Observable, Subscription } from 'rxjs';

import {
  Themes,
  ThemingService,
} from './shared/ui/theming/services/theming.service';
import { environment } from 'src/environments/environment';
import { Environment } from './shared/models/environment';
import { version } from '../../package.json';
import { LoadingService } from './shared/services/loading/loading.service';
import { AuthService } from './auth/services/auth.service';
import { User } from './shared/models/user';
import { AuthDialogComponent } from './auth/auth-dialog/auth-dialog.component';

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

  opened = false;
  fixedInViewport = true;

  constructor(
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer,
    private covalentDialogService: TdDialogService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: Themes) => {
        this.themeClass = theme;
        this.applyThemeOnOverlays();
      }
    );
    this.isLoading$ = this.loadingService.isLoading$;
    this.authService.autoLogin();
    this.loggedUser$ = this.authService.loggedUser$;
    this.environment = environment;
  }

  onChangeTheme(theme: Themes): void {
    this.themingService.changeTheme(theme);
  }

  onDEV(): void {
    this.covalentDialogService.openAlert({
      message: `Versiune aplicație: ${version}`,
      title: 'DEV',
      closeButton: 'OK',
    });
  }

  onOpenAuthDialog(): void {
    this.matDialog.open(AuthDialogComponent);
  }

  onResize(event: any): void {
    if (event.target.innerWidth >= 600) {
      this.opened = false;
    }
  }

  onOpenSidenav(): void {
    this.opened = true;
  }

  onCloseSidenav(): void {
    this.opened = false;
  }

  onLogout(): void {
    this.authService.logout();
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
