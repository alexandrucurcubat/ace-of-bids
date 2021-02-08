import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../models/user';
import { DrawerService } from './services/drawer.service';
import { AuthDialogComponent } from 'src/app/auth/auth-dialog/auth-dialog.component';

@Component({
  selector: 'ace-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  loggedUser$!: Observable<User | null>;

  constructor(
    private drawerService: DrawerService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loggedUser$ = this.authService.loggedUser$;
  }

  ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }

  onOpenAuthDialog(): void {
    const authDialog = this.dialog.open(AuthDialogComponent);
    authDialog.updatePosition({ top: '100px' });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
