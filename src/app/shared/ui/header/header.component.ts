import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../models/user';
import { AuthDialogComponent } from 'src/app/auth/auth-dialog/auth-dialog.component';

@Component({
  selector: 'ace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  loggedUser$!: Observable<User | null>;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loggedUser$ = this.authService.loggedUser$;
  }

  onOpenAuthDialog(): void {
    const authDialog = this.dialog.open(AuthDialogComponent);
    authDialog.updatePosition({ top: '100px' });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
