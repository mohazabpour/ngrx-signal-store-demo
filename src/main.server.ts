import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import {
  bootstrapApplication,
  BootstrapContext,
} from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { appConfig } from '@app/app.config';
import { provideServerRendering } from '@angular/platform-server';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

class ServerAuthServiceStub {
  isAuthenticated$ = of(false);
  user$ = of(null);
  loginWithRedirect() {
    throw new Error('Auth0 not available on server');
  }
}

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(
    AppComponent,
    {
      ...appConfig,
      providers: [
        ...appConfig.providers,
        provideServerRendering(),
        provideNoopAnimations(),
        {
          provide: AuthService,
          useClass: ServerAuthServiceStub,
        },
      ],
    },
    context,
  );
}
