import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'ace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output()
  openAuthDialog = new EventEmitter();
  loggedUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.loggedUser$ = this.authService.loggedUser$;
  }

  onOpenAuthDialog(): void {
    this.openAuthDialog.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
