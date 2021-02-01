import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { CovalentModule } from './ui/covalent/covalent.module';
import { MaterialModule } from './ui/material/material.module';
import { HeaderComponent } from './ui/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, MaterialModule, CovalentModule],
  exports: [MaterialModule, CovalentModule, AuthModule, HeaderComponent],
})
export class SharedModule {}
