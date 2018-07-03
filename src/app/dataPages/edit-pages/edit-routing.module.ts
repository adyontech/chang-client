import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCompanyComponent } from './editCompany/editCompany.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'company',
        component: EditCompanyComponent,
        data: {
          title: 'editcompany Page',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRoutingModule {}
