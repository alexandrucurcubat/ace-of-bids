import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';
import { SecondsToDhmsPipe } from './pipes/seconds-to-dhms.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    SecondsToDhmsPipe,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    SecondsToDhmsPipe,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
