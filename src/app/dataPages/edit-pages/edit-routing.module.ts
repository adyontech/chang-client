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
          title: 'edit company Page',
        },
      },
      {
        path: 'ledger',
        component: EditCompanyComponent,
        data: {
          title: 'Ledger edit Page',
        },
      },
      {
        path: 'undergroup',
        component: EditCompanyComponent,
        data: {
          title: 'Ledger edit Page',
        },
      },
      {
        path: 'productservice',
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
