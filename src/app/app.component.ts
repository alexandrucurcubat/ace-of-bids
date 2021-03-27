import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as Hammer from 'hammerjs';

import {
  Theme,
  ThemingService,
} from './shared/services/theming/theming.service';
import { AuthService } from './auth/services/auth.service';
import { LoadingService } from './shared/services/loading/loading.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './shared/services/sidenav/sidenav.service';

@Component({
  selector: 'ace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  ThemeEnum = Theme;
  theme$!: Observable<Theme>;
  isLoading$!: Observable<boolean>;
  currentYear = new Date().getFullYear();

  constructor(
    private authService: AuthService,
    private sidenavService: SidenavService,
    private themingService: ThemingService,
    private loadingService: LoadingService,
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
    this.authService.autoLogin();
    this.isLoading$ = this.loadingService.isLoading$;
    this.theme$ = this.themingService.theme$;
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
}
