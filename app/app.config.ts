import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // This config coalesces multiple browser events into a single change detection cycle
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Provide the router with your defined routes
    provideRouter(routes),
  ],
};
