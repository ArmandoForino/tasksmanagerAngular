import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from './utils';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ErrorsHandlerService } from './errors/errors-handler.service';

const DATA_SERVICES = [
  // ErrorsHandlerService,
  // { provide: ErrorHandler, useClass: ErrorsHandlerService },
];


export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
  AuthService
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AuthModule
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
