import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable, Subscription } from 'rxjs';
import { TdDialogService } from '@covalent/core/dialogs';

import {
  Themes,
  ThemingService,
} from './shared/ui/theming/services/theming.service';
import { environment } from 'src/environments/environment';
import { Environment } from './shared/models/environment';
import { version } from '../../package.json';
import { LoadingService } from './shared/services/loading/loading.service';
import { AuthService } from './auth/services/auth.service';
import { DrawerService } from './shared/ui/drawer/services/drawer.service';

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
  environment!: Environment;

  constructor(
    private drawerService: DrawerService,
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
    this.authService.autoLogin();
    this.environment = environment;
  }

  toggleDrawer() {
    this.drawerService.toggle();
  }

  onChangeTheme(theme: Themes): void {
    this.themingService.changeTheme(theme);
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
