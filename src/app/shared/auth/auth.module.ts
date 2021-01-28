import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MaterialModule } from '../ui/material/material.module';

@NgModule({
  declarations: [AuthDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [AuthDialogComponent],
})
export class AuthModule {}
