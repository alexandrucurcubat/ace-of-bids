import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import Hammer from '@egjs/hammerjs';

import {
  Theme,
  ThemingService,
} from './shared/services/theming/theming.service';
import { AuthService } from './auth/services/auth.service';
import { LoadingService } from './shared/services/loading/loading.service';
import { SidenavService } from './shared/services/sidenav/sidenav.service';
import { User } from './shared/models/user';
import { WindowRefService } from './shared/services/window-ref/window-ref.service';

@Component({
  selector: 'ace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @HostBinding('class') themeCssClass: Theme;
  themeSubscription: Subscription;
  theme$: Observable<Theme>;
  ThemeEnum = Theme;
  isLoading$: Observable<boolean>;
  loggedUser$: Observable<User | null>;
  currentYear = new Date().getFullYear();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private authService: AuthService,
    private sidenavService: SidenavService,
    private themingService: ThemingService,
    private loadingService: LoadingService,
    private elementRef: ElementRef,
    private windowRefService: WindowRefService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggedUser$ = this.authService.loggedUser$;
    this.isLoading$ = this.loadingService.isLoading$;
    this.theme$ = this.themingService.theme$;
    this.themeSubscription = this.theme$.subscribe(
      (theme) => (this.themeCssClass = theme)
    );

    if (isPlatformBrowser(this.platformId)) {
      const hammer = new Hammer(this.elementRef.nativeElement, {});
      hammer.on('panright', () => {
        if (this.windowRefService.nativeWindow.innerWidth < 600) {
          this.onOpenSidenav();
        }
      });
      hammer.on('panleft', () => {
        this.onCloseSidenav();
      });
    }
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  onResize(event: any): void {
    if (event.target.innerWidth >= 600) {
      this.sidenavService.close();
    }
  }

  onOpenSidenav(): void {
    this.sidenavService.open();
  }

  onCloseSidenav(): void {
    this.sidenavService.close();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
