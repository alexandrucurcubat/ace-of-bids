import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import {
  AuctionsView,
  AuctionsFilterBy,
  AuctionStatus,
} from '../models/auctions.enums';
import { Auction } from '../models/auction';
import { AuctionsService } from '../services/auctions.service';

@Component({
  selector: 'ace-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss'],
})
export class AuctionsComponent implements OnInit {
  filterBy = AuctionsFilterBy.ENDING_SOON;
  filterByOptions = [
    { value: AuctionsFilterBy.ENDING_SOON, option: 'Se închid în curând' },
    { value: AuctionsFilterBy.NEWLY_LISTED, option: 'Deschise recent' },
    { value: AuctionsFilterBy.NO_RESERVE, option: 'Fără rezervă' },
  ];
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
      this.auctions$ = this.auctionsService.getAuctions(
        params.status,
        this.filterBy
      );
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

  onFilterSelect(selectChange: MatSelectChange): void {
    this.filterBy = selectChange.value;
    this.auctions$ = this.auctionsService.getAuctions(
      this.auctionsStatus,
      this.filterBy
    );
  }
}
