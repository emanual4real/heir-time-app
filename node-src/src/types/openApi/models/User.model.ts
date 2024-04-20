import { components, paths } from '../schema/schema';

// Models
export type User = components['schemas']['User'];

// GET /api/User
export type UserGetResponse =
  paths['/api/User']['get']['responses'][200]['content']['application/json'];

// GET /api/User/me
export type UserByMeGetResponse =
  paths['/api/User/me']['get']['responses'][200]['content']['application/json'];

// GET /api/User/{email}
export type UserByEmailResponse =
  paths['/api/User/{email}']['get']['responses'][200]['content']['application/json'];

export type UserByEmailParameters = paths['/api/User/{email}']['get']['parameters']['path'];

// GET /api/User/login
export type UserLoginPostResponse =
  paths['/api/User/login']['post']['responses'][200]['content']['application/json'];

export type UserLoginPostRequestBody = paths['/api/User/login']['post']['requestBody'];

// GET /api/User/logout
export type UserLogoutGetResponse =
  paths['/api/User/logout']['get']['responses'][200]['content']['application/json'];

// GET /api/User/register
export type UserRegisterPostResponse =
  paths['/api/User/register']['post']['responses'][200]['content']['application/json'];

export type UserRegisterPostRequestBody = paths['/api/User/register']['post']['requestBody'];
