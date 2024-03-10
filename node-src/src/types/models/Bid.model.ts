export interface BidPayload {
  value: number;
  itemId: string;
  receivingDate: string;
}

export interface Bid {
  value: number;
  receivingDate: string;
  user?: string;
  createdAt?: string;
}
