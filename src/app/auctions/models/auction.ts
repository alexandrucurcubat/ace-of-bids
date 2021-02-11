import { User } from 'src/app/shared/models/user';
import { AuctionStatus, AuctionCurrency } from './auctions.enums';

export interface Auction {
  id: number;
  status: AuctionStatus;
  title: string;
  description: string;
  imageUrl?: string;
  noReserve: boolean;
  currency: AuctionCurrency;
  lastBid?: number;
  timeBeforeClose: number;
  sold: boolean;
  bids: Bid[];
  openTimestamp: Date;
  closeTimestamp?: Date;
}

export interface Bid {
  id: number;
  amount: number;
  bidder: User;
  timestamp: Date;
}
