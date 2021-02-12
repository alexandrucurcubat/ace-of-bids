import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Auction } from '../models/auction';
import {
  AuctionCurrency,
  AuctionStatus,
  AuctionsView,
} from '../models/auctions.enums';

@Injectable({ providedIn: 'root' })
export class AuctionsService {
  private auctions: Auction[] = [
    {
      id: 1,
      status: AuctionStatus.LIVE,
      title: 'Licitația 1',
      description: 'Descriere 1',
      imageUrl: 'favicon.ico',
      noReserve: false,
      currency: AuctionCurrency.EUR,
      lastBid: 1.0,
      timeBeforeClose: 118123,
      sold: false,
      bids: [],
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
    },
    {
      id: 2,
      status: AuctionStatus.LIVE,
      title: 'Licitația 2',
      description: 'Descriere 2',
      imageUrl: 'favicon.ico',
      noReserve: true,
      currency: AuctionCurrency.USD,
      lastBid: 0.0,
      timeBeforeClose: 86400,
      sold: false,
      bids: [],
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
    },
    {
      id: 3,
      status: AuctionStatus.LIVE,
      title: 'Licitația 3',
      description: 'Descriere 3',
      imageUrl: 'favicon.ico',
      noReserve: true,
      currency: AuctionCurrency.EUR,
      lastBid: 3.0,
      timeBeforeClose: 54000,
      sold: false,
      bids: [],
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
    },
    {
      id: 4,
      status: AuctionStatus.LIVE,
      title: 'Licitația 4',
      description: 'Descriere 4',
      imageUrl: 'favicon.ico',
      noReserve: false,
      currency: AuctionCurrency.EUR,
      lastBid: 4.0,
      timeBeforeClose: 2520,
      sold: false,
      bids: [],
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
    },
    {
      id: 5,
      status: AuctionStatus.LIVE,
      title: 'Licitația 5',
      description: 'Descriere 5',
      imageUrl: 'favicon.ico',
      noReserve: true,
      currency: AuctionCurrency.RON,
      lastBid: 5.0,
      timeBeforeClose: 259200,
      sold: false,
      bids: [],
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
    },
    {
      id: 6,
      status: AuctionStatus.CLOSED,
      title: 'Licitația 6',
      description: 'Descriere 6',
      imageUrl: 'favicon.ico',
      noReserve: true,
      currency: AuctionCurrency.USD,
      lastBid: 60.0,
      timeBeforeClose: 0,
      sold: true,
      bids: [],
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
    },
  ];

  constructor() {}

  getAuctions(status: string): Observable<any[]> {
    if (!status) {
      status = AuctionStatus.LIVE;
    }
    return of(this.auctions.filter((auction) => auction.status === status));
  }

  getAuctionsView(): AuctionsView {
    return (
      (localStorage.getItem('auctions-view') as AuctionsView) ||
      AuctionsView.GRID
    );
  }

  setAuctionsView(view: AuctionsView): void {
    localStorage.setItem('auctions-view', view);
  }
}
