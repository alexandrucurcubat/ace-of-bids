import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { Auction } from './models/auction';
import {
  AuctionsView,
  AuctionFilterOptions,
  AuctionStatus,
} from './models/auctions.enums';
import { AuctionsService } from './services/auctions.service';

@Component({
  selector: 'ace-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss'],
})
export class AuctionsComponent implements OnInit {
  filterOptions = [
    { value: AuctionFilterOptions.ENDING_SOON, option: 'Se închid în curând' },
    { value: AuctionFilterOptions.NEWLY_LISTED, option: 'Deschise recent' },
    { value: AuctionFilterOptions.NO_RESERVE, option: 'Fără rezervă' },
  ];
  selectedFilterOption = AuctionFilterOptions.ENDING_SOON;
  AUCTIONS_VIEW = AuctionsView;
  AUCTIONS_STATUS = AuctionStatus;
  auctionsView!: AuctionsView;
  auctionsStatus!: AuctionStatus;
  auctions$!: Observable<Auction[]>;

  constructor(
    private auctionsService: AuctionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.auctionsStatus = params.status;
      this.auctions$ = this.auctionsService.getAuctions(params.status);
    });
    this.auctionsView = this.auctionsService.getAuctionsView();
  }

  onSetGridView(): void {
    this.auctionsView = AuctionsView.GRID;
    this.auctionsService.setAuctionsView(AuctionsView.GRID);
  }

  onSetListView(): void {
    this.auctionsView = AuctionsView.LIST;
    this.auctionsService.setAuctionsView(AuctionsView.LIST);
  }
}
