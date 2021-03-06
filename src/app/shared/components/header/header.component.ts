import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthComponent } from 'src/app/auth/auth.component';
import { User } from '../../models/user';
import { Theme, ThemingService } from '../../services/theming/theming.service';

@Component({
  selector: 'ace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() theme!: Theme | null;
  @Input() loggedUser!: User | null;
  ThemeEnum = Theme;

  constructor(
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

  onLogout(): void {
    this.authService.logout();
  }
}
