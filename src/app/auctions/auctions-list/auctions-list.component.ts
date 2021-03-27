import { Component, Input } from '@angular/core';

import { Auction } from '../models/auction';
import { AuctionStatus } from '../models/auctions.enums';

@Component({
  selector: 'ace-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrls: ['./auctions-list.component.scss'],
})
export class AuctionsListComponent {
  @Input() auctions!: Auction[] | null;
  AUCTIONS_STATUS = AuctionStatus;
}
