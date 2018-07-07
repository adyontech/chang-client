import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCompanyComponent } from './editCompany/editCompany.component';
import { EditLedgerComponent } from './editLedger/editLedger.component';
import { EditProductServiceComponent } from './editProductService/editProductService.component';
import { EditUnderGroupComponent } from './editUndergroup/editUndergroup.component';
import { EditCompanyNameComponent } from './editCompanyName/editCompanyName.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gateway',
        component: EditCompanyComponent,
        data: {
          title: 'edit company Page',
        },
      },
      {
        path: 'companyname',
        component: EditCompanyNameComponent,
        data: {
          title: 'edit company name Page',
        },
      },
      {
        path: 'ledger',
        component: EditLedgerComponent,
        data: {
          title: 'Ledger edit Page',
        },
      },
      {
        path: 'undergroup',
        component: EditUnderGroupComponent,
        data: {
          title: 'Ledger edit Page',
        },
      },
      {
        path: 'productservice',
        component: EditProductServiceComponent,
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
