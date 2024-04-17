import { components, paths } from '../schema/schema';

// Models
export type Item = components['schemas']['Item'];

// GET /api/Item/{id}
export type ItemGetQueryParameters = paths['/api/Item']['get']['parameters']['query'];

export type ItemGetResponse =
  paths['/api/Item']['get']['responses'][200]['content']['application/json'];

// PUT /api/Item/{id}
export type ItemPutQueryParameters = paths['/api/Item']['put']['parameters']['query'];

export type ItemPutResponse =
  paths['/api/Item']['put']['responses'][200]['content']['application/json'];

export type ItemPutRequestBody = paths['/api/Item']['put']['requestBody'];

// POST /api/Item/{id}
export type ItemPostResponse =
  paths['/api/Item']['post']['responses'][200]['content']['application/json'];

export type ItemPostRequestBody = paths['/api/Item']['post']['requestBody'];

// DELETE /api/Item/{id}
export type ItemDeleteByIdQueryParameters =
  paths['/api/Item/{id}']['delete']['parameters']['query'];

export type ItemDeleteByIdPathParameters = paths['/api/Item/{id}']['delete']['parameters']['path'];

export type ItemDeleteByIdResponse =
  paths['/api/Item/{id}']['get']['responses'][200]['content']['application/json'];
