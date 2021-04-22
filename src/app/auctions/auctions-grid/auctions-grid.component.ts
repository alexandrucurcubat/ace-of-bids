import { Component, Input } from '@angular/core';

import { AuctionStatus, IAuction } from 'common/models/auction.interface';

@Component({
  selector: 'ace-auctions-grid',
  templateUrl: './auctions-grid.component.html',
  styleUrls: ['./auctions-grid.component.scss'],
})
export class AuctionsGridComponent {
  @Input() auctions: IAuction[] | null;
  AUCTIONS_STATUS = AuctionStatus;
}
