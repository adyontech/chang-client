import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileComponent } from './editProfile/editProfile.component';
import { MeProfileComponent } from './me/me.component';
import { PasswordChangeProfileComponent } from './passwordChange/passwordChange.component';
import { MailSubsProfileComponent } from './mailSubs/mailSubs.component';
import { ContributorsComponent } from './contributors/contributors.component';

// import { GalleryPageComponent } from './gallery/gallery-page.component';
// import { InvoicePageComponent } from './invoice/invoice-page.component';
// import { HorizontalTimelinePageComponent } from './timeline/horizontal/horizontal-timeline-page.component';
// import { VerticalTimelinePageComponent } from './timeline/vertical/vertical-timeline-page.component';
// import { UserProfilePageComponent } from './user-profile/user-profile-page.component';
// import { SearchComponent } from './search/search.component';
// import { FaqComponent } from './faq/faq.component';
// import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';

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
        path: 'cntributors',
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
