import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileComponent } from './editProfile/editProfile.component';
import { MeProfileComponent } from './me/me.component';
import { PasswordChangeProfileComponent } from './passwordChange/passwordChange.component';
import { MailSubsProfileComponent } from './mailSubs/mailSubs.component';
import { ContributorsComponent } from './contributors/contributors.component';
import {UpgradeProfileComponent} from './upgrade/upgrade.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MeProfileComponent,
        data: {
          title: 'Me',
        },
      },
      {
        path: 'me',
        component: MeProfileComponent,
        data: {
          title: 'Me',
        },
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        data: {
          title: 'edit profile',
        },
      },
      {
        path: 'passwordchange',
        component: PasswordChangeProfileComponent,
        data: {
          title: 'password change',
        },
      },
      {
        path: 'managemail',
        component: MailSubsProfileComponent,
        data: {
          title: 'Manage mail',
        },
      },
      {
        path: 'contributors',
        component: ContributorsComponent,
        data: {
          title: 'Contributors Page',
        },
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        data: {
          title: 'Gallery Page',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingRoutingModule {}
