import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CovalentModule } from './ui/covalent/covalent.module';
import { MaterialModule } from './ui/material/material.module';
import { SecondsToDhmsPipe } from './pipes/seconds-to-dhms.pipe';

@NgModule({
  declarations: [SecondsToDhmsPipe],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CovalentModule,
    FlexLayoutModule,
  ],
  exports: [
    MaterialModule,
    CovalentModule,
    FlexLayoutModule,
    SecondsToDhmsPipe,
  ],
})
export class SharedModule {}
