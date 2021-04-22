import { Component, Input } from '@angular/core';

import { AuctionStatus, IAuction } from 'common/models/auction.interface';

@Component({
  selector: 'ace-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrls: ['./auctions-list.component.scss'],
})
export class AuctionsListComponent {
  @Input() auctions: IAuction[] | null;
  AUCTIONS_STATUS = AuctionStatus;
}
