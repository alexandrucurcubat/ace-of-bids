import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionsComponent } from './auctions.component';
import { AuctionsLiveComponent } from './auctions-live/auctions-live.component';
import { AuctionsClosedComponent } from './auctions-closed/auctions-closed.component';

@NgModule({
  declarations: [
    AuctionsComponent,
    AuctionsLiveComponent,
    AuctionsClosedComponent,
  ],
  imports: [CommonModule],
})
export class AuctionsModule {}
