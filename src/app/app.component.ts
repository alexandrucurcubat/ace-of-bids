import {
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import * as Hammer from 'hammerjs';

import {
  Themes,
  ThemingService,
} from './shared/ui/theming/services/theming.service';
import { User } from './shared/models/user';
import { Environment } from './shared/models/environment';
import { AuthService } from './auth/services/auth.service';
import { LoadingService } from './shared/services/loading/loading.service';
import { AuthComponent } from './auth/auth.component';

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
  sidenavIsOpened = false;
  currentYear = new Date().getFullYear();

  constructor(
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer,
    private authService: AuthService,
    private loadingService: LoadingService,
    private matDialog: MatDialog,
    elementRef: ElementRef
  ) {
    const hammertime = new Hammer(elementRef.nativeElement, {});
    hammertime.on('panright', () => {
      if (window.innerWidth < 600) {
        this.onOpenSidenav();
      }
    });
    hammertime.on('panleft', () => {
      this.onCloseSidenav();
    });
  }

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
    this.environment = this.environment;
  }

  onChangeTheme(theme: Themes): void {
    this.themingService.changeTheme(theme);
  }

  onOpenAuthDialog(): void {
    this.matDialog.open(AuthComponent);
  }

  onResize(event: any): void {
    if (event.target.innerWidth >= 600) {
      this.sidenavIsOpened = false;
    }
  }

  onOpenSidenav(): void {
    this.sidenavIsOpened = true;
  }

  onCloseSidenav(): void {
    this.sidenavIsOpened = false;
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
