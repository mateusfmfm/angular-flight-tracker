import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { InMemoryCache } from '@apollo/client/core';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl/config';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideMaplibreWorker('maplibre-gl-worker.mjs'),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: 'http://localhost:8080/query',
        }),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
