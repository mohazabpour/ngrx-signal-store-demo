import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';

import { appRoutes } from './app.routes';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { deAT } from 'date-fns/locale';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import {
  loadingInterceptor,
  sharedUiMessagingProvider,
} from '@app/shared/ui-messaging';
import { baseUrlInterceptor, errorInterceptor } from '@app/shared/http';
import { provideSecurity } from '@app/shared/security';
import { sharedMasterDataProvider } from '@app/shared/master-data';
import { Configuration } from '@app/shared/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor,
        loadingInterceptor,
        errorInterceptor,
      ]),
      withFetch(),
    ),

    ...provideSecurity,
    ...sharedMasterDataProvider,
    ...sharedUiMessagingProvider,

    importProvidersFrom(MatDateFnsModule),

    { provide: MAT_DATE_LOCALE, useValue: deAT },
    { provide: LOCALE_ID, useValue: 'de-AT' },

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },

    { provide: ErrorHandler, useClass: ErrorHandlerService },

    {
      provide: Configuration,
      useValue: new Configuration(
        'https://api.eternal-holidays.net',
        true,
        false,
      ),
    },
  ],
};
