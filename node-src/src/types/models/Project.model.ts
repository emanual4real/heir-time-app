import { components, paths } from '..';

// Models
export type Project = components['schemas']['Project'];

// GET /api/Project
export type ProjectGetResponse =
  paths['/api/Project']['get']['responses'][200]['content']['application/json'];

// GET /api/Project/{projectId}
export type ProjectByIdGetResponse =
  paths['/api/Project/{projectId}']['get']['responses'][200]['content']['application/json'];

export type ProjectByIdGetParameters =
  paths['/api/Project/{projectId}']['get']['parameters']['path'];

// POST /api/Project
export type ProjectPostResponse =
  paths['/api/Project']['post']['responses'][200]['content']['application/json'];

export type ProjectPostRequestBody = paths['/api/Project']['post']['requestBody'];

// DELETE /api/Project
export type ProjectByIdDeleteParameters =
  paths['/api/Project/{projectId}']['delete']['parameters']['path'];

export type ProjectByIdDeleteResponse =
  paths['/api/Project/{projectId}']['delete']['responses'][200]['content']['application/json'];
