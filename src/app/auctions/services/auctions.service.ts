import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LocalStorageSrvice } from 'src/app/shared/services/local-storage/local-storage.service';
import { Auction } from '../models/auction';
import {
  AuctionCurrency,
  AuctionsFilterBy,
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
      images: ['assets/icons/icon-512x512.png'],
      reserve: 100,
      currency: AuctionCurrency.EUR,
      status: AuctionStatus.LIVE,
      openTimestamp: new Date(),
      closeTimestamp: new Date(),
      timeBeforeClose: 10,
      bids: [],
      lastBid: 1.0,
      sold: false,
    },
    {
      id: 2,
      title: 'Licitația 2',
      description: 'Descriere 2',
      images: ['assets/icons/icon-512x512.png'],
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
      images: ['assets/icons/icon-512x512.png'],
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
      images: ['assets/icons/icon-512x512.png'],
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
      images: ['assets/icons/icon-512x512.png'],
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
      images: ['assets/icons/icon-512x512.png'],
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
      images: ['assets/icons/icon-512x512.png'],
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

  constructor(private localStorageService: LocalStorageSrvice) {}

  simulateCloseTime(): void {
    setInterval(() => {
      this.auctions.map((auction: Auction) =>
        auction.timeBeforeClose !== 0
          ? auction.timeBeforeClose--
          : (auction.status = AuctionStatus.CLOSED)
      );
    }, 1000);
  }

  getAuctions(
    status: AuctionStatus,
    filterBy?: AuctionsFilterBy
  ): Observable<any[]> {
    if (status === AuctionStatus.CLOSED) {
      return of(this.getClosedAuctions());
    } else {
      switch (filterBy) {
        case AuctionsFilterBy.ENDING_SOON:
          return of(this.getEndingSoonAuctions());
        case AuctionsFilterBy.NEWLY_LISTED:
          return of(this.getNewlyListedAuctions());
        case AuctionsFilterBy.NO_RESERVE:
          return of(this.getNoReserveAuctions());
        default:
          return of(this.getLiveAuctions());
      }
    }
  }

  private getLiveAuctions(): Auction[] {
    return this.auctions.filter(
      (auction) => auction.status === AuctionStatus.LIVE
    );
  }

  private getEndingSoonAuctions(): Auction[] {
    return this.sortByEndingSoon(this.auctions).filter(
      (auction) => auction.status === AuctionStatus.LIVE
    );
  }

  private getNewlyListedAuctions(): Auction[] {
    return this.sortByNewlyListed(this.auctions).filter(
      (auction) => auction.status === AuctionStatus.LIVE
    );
  }

  private getClosedAuctions(): Auction[] {
    return this.sortByNewlyListed(this.auctions).filter(
      (auction) => auction.status === AuctionStatus.CLOSED
    );
  }

  private getNoReserveAuctions(): Auction[] {
    return this.sortByEndingSoon(this.auctions).filter(
      (auction) => auction.status === AuctionStatus.LIVE && !auction.reserve
    );
  }

  private sortByEndingSoon(auctions: Auction[]): Auction[] {
    return auctions.sort((a, b) =>
      a.timeBeforeClose > b.timeBeforeClose
        ? 1
        : b.timeBeforeClose > a.timeBeforeClose
        ? -1
        : 0
    );
  }

  private sortByNewlyListed(auctions: Auction[]): Auction[] {
    return auctions.sort((a, b) => (a.id < b.id ? 1 : b.id < a.id ? -1 : 0));
  }

  getAuctionsView(): AuctionsView {
    return (
      (this.localStorageService.getItem('auctions-view') as AuctionsView) ||
      AuctionsView.GRID
    );
  }

  setAuctionsView(view: AuctionsView): void {
    this.localStorageService.setItem('auctions-view', view);
  }
}
