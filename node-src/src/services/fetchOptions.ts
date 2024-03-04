export type MethodType = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export const createRequestOptions = (method: MethodType, body?: object): RequestInit => ({
  method: method,
  body: JSON.stringify(body),
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
