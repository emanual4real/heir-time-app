import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { credentialsInterceptor } from '@interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    // [
    //   {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: credentialsInterceptor,
    //     multi: true,
    //   },
    // ],
  ],
};
