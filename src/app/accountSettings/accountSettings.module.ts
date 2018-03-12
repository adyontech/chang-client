import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AccountSettingRoutingModule } from './accountSettings-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditProfileComponent } from './editProfile/editProfile.component';
import { MeProfileComponent } from './me/me.component';
import { PasswordChangeProfileComponent } from './passwordChange/passwordChange.component';
import { MailSubsProfileComponent } from './mailSubs/mailSubs.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { UpgradeProfileComponent } from './upgrade/upgrade.component';
import { ConfirmComponent } from './confirm/confirm.component';

import { ContributorService } from './contributors/service/contributors.service';
import { PasswordChangeService } from './passwordChange/service/passwordChange.service';
import { GlobalVaribles } from './../shared/globalVariables/globalVariable';
import { EditProfileService } from './editProfile/service/editProfile.service';
import { UpgradeService } from './upgrade/service/upgrade.service';
import { ConfirmService } from './confirm/service/confirm.service';
// import { States } from './../shared/forms/States';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    AccountSettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgbModule,
    NgSelectModule,
  ],
  declarations: [
    ConfirmComponent,
    EditProfileComponent,
    MeProfileComponent,
    PasswordChangeProfileComponent,
    MailSubsProfileComponent,
    ContributorsComponent,
    UpgradeProfileComponent,
  ],
  providers: [
    ConfirmService,
    ContributorService,
    GlobalVaribles,
    PasswordChangeService,
    EditProfileService,
    UpgradeService,
  ],
})
export class AccountSettingsModule {}
