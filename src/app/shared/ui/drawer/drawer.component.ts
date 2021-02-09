import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../models/user';
import { DrawerService } from './services/drawer.service';
import { AuthDialogComponent } from 'src/app/auth/auth-dialog/auth-dialog.component';
import { Themes, ThemingService } from '../theming/services/theming.service';

@Component({
  selector: 'ace-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  loggedUser$!: Observable<User | null>;
  @Output() changeTheme = new EventEmitter();
  ThemesEnum = Themes;
  themeClass!: Themes;
  themingSubscription = new Subscription();

  constructor(
    private drawerService: DrawerService,
    private authService: AuthService,
    private dialog: MatDialog,
    private themingService: ThemingService
  ) {}

  ngOnInit(): void {
    this.loggedUser$ = this.authService.loggedUser$;
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: Themes) => (this.themeClass = theme)
    );
  }

  ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }

  onOpenAuthDialog(): void {
    const authDialog = this.dialog.open(AuthDialogComponent);
    authDialog.updatePosition({ top: '100px' });
  }

  onChangeTheme(theme: Themes): void {
    this.changeTheme.emit(theme);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
