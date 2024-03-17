export type MethodType = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export const createDefaultRequestOptions = (method: MethodType, body?: object): RequestInit => ({
  method: method,
  body: JSON.stringify(body),
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const createFormDataRequestOptions = (method: MethodType, body?: object): RequestInit => ({
  method: method,
  body: JSON.stringify(body),
  mode: 'cors',
  credentials: 'include',
  headers: {
    accept: 'text/plain',
    'Content-Type': 'multipart/form-data'
  }
});
