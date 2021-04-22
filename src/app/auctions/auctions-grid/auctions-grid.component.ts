import { Component, Input } from '@angular/core';

import { Auction } from '../models/auction';
import { AuctionStatus } from '../models/auctions.enums';

@Component({
  selector: 'ace-auctions-grid',
  templateUrl: './auctions-grid.component.html',
  styleUrls: ['./auctions-grid.component.scss'],
})
export class AuctionsGridComponent {
  @Input() auctions!: Auction[] | null;
  AUCTIONS_STATUS = AuctionStatus;
}
