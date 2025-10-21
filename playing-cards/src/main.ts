import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideLottieOptions({ player: () => player })
  ]
});