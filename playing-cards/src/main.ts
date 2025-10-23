import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './app/interceptors/auth-token/auth-token-interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideLottieOptions({ player: () => player }),
     provideHttpClient(withInterceptors([authTokenInterceptor]))
  ]
});