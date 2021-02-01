import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CovalentModule } from './ui/covalent/covalent.module';
import { MaterialModule } from './ui/material/material.module';
import { HeaderComponent } from './ui/header/header.component';
import { DrawerComponent } from './ui/drawer/drawer.component';

@NgModule({
  declarations: [HeaderComponent, DrawerComponent],
  imports: [CommonModule, RouterModule, MaterialModule, CovalentModule],
  exports: [MaterialModule, CovalentModule, HeaderComponent, DrawerComponent],
})
export class SharedModule {}
