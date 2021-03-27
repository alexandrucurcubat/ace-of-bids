import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuctionsComponent } from './auctions.component';
import { SharedModule } from '../shared/shared.module';
import { AuctionsGridComponent } from './auctions-grid/auctions-grid.component';
import { AuctionsListComponent } from './auctions-list/auctions-list.component';

@NgModule({
  declarations: [AuctionsComponent, AuctionsGridComponent, AuctionsListComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class AuctionsModule {}
