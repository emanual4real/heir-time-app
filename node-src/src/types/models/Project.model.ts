import { components, paths } from '..';

// Models
export type Item = components['schemas']['Project'];

// Api request body
export type ProjectPostRequestBody = paths['/api/Project']['post']['requestBody'];

// Api responses
export type ProjectGetResponseBody =
  paths['/api/Project']['get']['responses'][200]['content']['application/json'];
