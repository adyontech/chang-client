import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaModule } from 'ng-recaptcha';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ArchwizardModule } from 'ng2-archwizard';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import { CustomOption } from './shared/toastr/custom-option';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

import * as $ from 'jquery';


@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, SettingsLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    RecaptchaModule.forRoot(),
    SharedModule,
    HttpClientModule,
    NgSelectModule,
    ToastModule.forRoot(),
    NgbModule.forRoot(),
    ArchwizardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo',
    }),
  ],
  providers: [
    // Toastr and auth providers
    { provide: ToastOptions, useClass: CustomOption },
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
