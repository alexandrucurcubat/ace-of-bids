import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthComponent } from 'src/app/auth/auth.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../models/user';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { Theme, ThemingService } from '../../services/theming/theming.service';

@Component({
  selector: 'ace-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input() theme: Theme | null;
  @Input() loggedUser: User | null;
  ThemeEnum = Theme;

  constructor(
    private sidenavService: SidenavService,
    private themingService: ThemingService,
    private authService: AuthService,
    private matDialog: MatDialog
  ) {}

  onChangeTheme(theme: Theme): void {
    this.themingService.applyTheme(theme);
  }

  onOpenAuthDialog(): void {
    this.matDialog.open(AuthComponent);
  }

  onCloseSidenav(): void {
    this.sidenavService.close();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
