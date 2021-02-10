import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CovalentModule } from './ui/covalent/covalent.module';
import { MaterialModule } from './ui/material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, MaterialModule, CovalentModule, FlexLayoutModule],
  exports: [MaterialModule, CovalentModule, FlexLayoutModule],
})
export class SharedModule { }
