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
      title: 'Licitația 1',
      description: 'Descriere 1',
      images: ['favicon.ico'],
      reserve: 100,
      currency: AuctionCurrency.EUR,
      status: AuctionStatus.LIVE,
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
      timeBeforeClose: 18123,
      bids: [],
      lastBid: 1.0,
      sold: false,
    },
    {
      id: 2,
      title: 'Licitația 2',
      description: 'Descriere 2',
      images: ['favicon.ico'],
      currency: AuctionCurrency.USD,
      status: AuctionStatus.LIVE,
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
      timeBeforeClose: 86400,
      bids: [],
      lastBid: 0.0,
      sold: false,
    },
    {
      id: 3,
      title: 'Licitația 3',
      description: 'Descriere 3',
      images: ['favicon.ico'],
      currency: AuctionCurrency.EUR,
      status: AuctionStatus.LIVE,
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
      timeBeforeClose: 54000,
      bids: [],
      lastBid: 3.0,
      sold: false,
    },
    {
      id: 4,
      title: 'Licitația 4',
      description: 'Descriere 4',
      images: ['favicon.ico'],
      reserve: 400,
      currency: AuctionCurrency.EUR,
      status: AuctionStatus.LIVE,
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
      timeBeforeClose: 2520,
      bids: [],
      lastBid: 4.0,
      sold: false,
    },
    {
      id: 5,
      title: 'Licitația 5',
      description: 'Descriere 5',
      images: ['favicon.ico'],
      currency: AuctionCurrency.RON,
      status: AuctionStatus.LIVE,
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
      timeBeforeClose: 259200,
      bids: [],
      lastBid: 5.0,
      sold: false,
    },
    {
      id: 6,
      title: 'Licitația 6',
      description: 'Descriere 6',
      images: ['favicon.ico'],
      currency: AuctionCurrency.USD,
      status: AuctionStatus.CLOSED,
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
      timeBeforeClose: 0,
      bids: [],
      lastBid: 60.0,
      sold: true,
    },
    {
      id: 7,
      title: 'Licitația 7',
      description: 'Descriere 7',
      images: ['favicon.ico'],
      reserve: 700,
      currency: AuctionCurrency.USD,
      status: AuctionStatus.CLOSED,
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
      timeBeforeClose: 0,
      bids: [],
      lastBid: 70.0,
      sold: false,
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
