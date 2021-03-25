import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './ui/material/material.module';
import { SecondsToDhmsPipe } from './pipes/seconds-to-dhms.pipe';

@NgModule({
  declarations: [SecondsToDhmsPipe],
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  exports: [MaterialModule, FlexLayoutModule, SecondsToDhmsPipe],
})
export class SharedModule {}
