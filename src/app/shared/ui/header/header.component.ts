import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthDialogComponent } from 'src/app/shared/auth/auth-dialog/auth-dialog.component';

@Component({
  selector: 'ace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onOpenAuthDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }
}
