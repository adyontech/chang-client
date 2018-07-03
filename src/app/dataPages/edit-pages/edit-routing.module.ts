import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCompanyComponent } from './addCompany/addCompany.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'editcompany',
        component: AddCompanyComponent,
        data: {
          title: 'addcompany Page',
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
