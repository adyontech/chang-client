import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgSelectModule } from '@ng-select/ng-select';
import { AvatarModule } from 'ngx-avatar';

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

import {  NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomOption } from './shared/toastr/custom-option';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { ToastrService } from './utilities/toastr.service';
import { NgbDateCustomParserFormatter } from './shared/globalVariables/datePipe';
import * as $ from 'jquery';

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, SettingsLayoutComponent],
  imports: [
    AvatarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
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
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},
    AuthService,
    AuthGuard,
    ToastrService,
    NgbDateCustomParserFormatter,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
