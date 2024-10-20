import { HttpInterceptorFn } from '@angular/common/http';

export const commonHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return next(req);
};
