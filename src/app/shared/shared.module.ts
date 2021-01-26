import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { CovalentModule } from './ui/covalent/covalent.module';
import { MaterialModule } from './ui/material/material.module';

@NgModule({
  imports: [MaterialModule],
  exports: [MaterialModule, CovalentModule, AuthModule],
})
export class SharedModule {}
