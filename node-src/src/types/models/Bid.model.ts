export interface BidPayload {
  projectId: string;
  itemId: number;
  value: number;
  receivingDate: string;
}

export interface Bid {
  value: number;
  receivingDate: string;
  user?: string;
  createdAt?: string;
}
