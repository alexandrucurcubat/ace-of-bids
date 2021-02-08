import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionsComponent } from './auctions.component';
import { AuctionsLiveComponent } from './auctions-live/auctions-live.component';
import { AuctionsClosedComponent } from './auctions-closed/auctions-closed.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuctionsComponent,
    AuctionsLiveComponent,
    AuctionsClosedComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class AuctionsModule {}
