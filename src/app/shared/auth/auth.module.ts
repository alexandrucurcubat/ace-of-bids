import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@NgModule({
  declarations: [AuthDialogComponent],
  imports: [CommonModule],
  exports: [AuthDialogComponent],
})
export class AuthModule {}
