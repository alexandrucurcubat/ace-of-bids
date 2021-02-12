import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuctionsComponent } from './components/auctions.component';
import { SharedModule } from '../shared/shared.module';
import { SecondsToDhmsPipe } from './pipes/seconds-to-dhms.pipe';

@NgModule({
  declarations: [AuctionsComponent, SecondsToDhmsPipe],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class AuctionsModule {}
