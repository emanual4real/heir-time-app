import { components, paths } from '..';

// Models
export type Item = components['schemas']['Item'];

// Api request body
export type ItemPostRequestBody = paths['/api/Item']['post']['requestBody'];

export type ItemPutRequestBody = paths['/api/Item']['put']['requestBody'];

// Api responses
export type ItemPostResponseBody =
  paths['/api/Item']['post']['responses'][200]['content']['application/json'];

export type ItemPutResponseBody =
  paths['/api/Item']['put']['responses'][200]['content']['application/json'];

export type ItemGetResponseBody =
  paths['/api/Item/{id}']['get']['responses'][200]['content']['application/json'];

export type ItemsGetResponseBody =
  paths['/api/Item/items']['get']['responses'][200]['content']['application/json'];

export type ItemDeleteResponseBody =
  paths['/api/Item/{id}']['delete']['responses'][200]['content']['application/json'];

export type ItemGetParameters = paths['/api/Item/{id}']['get']['parameters'];
