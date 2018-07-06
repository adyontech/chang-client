import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCompanyComponent } from './editCompany/editCompany.component';
import { EditLedgerComponent } from './editLedger/editLedger.component';
import { EditProductServiceComponent } from './editProductService/editProductService.component';
import { EditUnderGroupComponent } from './editUndergroup/editUndergroup.component';

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
