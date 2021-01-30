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

  constructor(private authaService: AuthService) {
    this.loggedUser$ = this.authaService.loggedUser$;
  }

  onOpenAuthDialog(): void {
    this.openAuthDialog.emit();
  }

  onLogout(): void {
    this.authaService.logout();
  }
}
