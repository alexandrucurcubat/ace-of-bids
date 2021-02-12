import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuctionsComponent } from './components/auctions.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuctionsComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class AuctionsModule {}
