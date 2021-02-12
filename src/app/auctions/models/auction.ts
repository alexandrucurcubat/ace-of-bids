import { User } from 'src/app/shared/models/user';
import { AuctionStatus, AuctionCurrency } from './auctions.enums';

export interface Auction {
  id: number;
  title: string;
  description: string;
  images: string[];
  reserve?: number;
  currency: AuctionCurrency;
  status: AuctionStatus;
  openTimestamp: Date;
  closeTimestamp?: Date;
  timeBeforeClose: number;
  bids: Bid[];
  lastBid?: number;
  sold: boolean;
}

export interface Bid {
  id: number;
  amount: number;
  bidder: User;
  timestamp: Date;
}
