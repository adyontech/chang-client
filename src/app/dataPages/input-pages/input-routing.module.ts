import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentComponent } from './payment/payment.component';
import { UnderGroupComponent } from './undergroup/undergroup.component';
import { LedgerComponent } from './ledger/ledger.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'payment Page',
        },
      },
      {
        path: 'undergroup',
        component: UnderGroupComponent,
        data: {
          title: 'under group Page',
        },
      },
      {
        path: 'ledger',
        component: LedgerComponent,
        data: {
          title: 'ledger Page',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputPagesRoutingModule {}
