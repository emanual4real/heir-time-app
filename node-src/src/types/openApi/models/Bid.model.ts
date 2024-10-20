import { components, paths } from '../schema/schema';

export type BidPayload = components['schemas']['BidInput'];

export type Bid = components['schemas']['Bid'];

export type WinnerPayload = components['schemas']['WinnerInput'];

export type BidPutRequestBody = paths['/api/Item/bid']['put']['requestBody'];
