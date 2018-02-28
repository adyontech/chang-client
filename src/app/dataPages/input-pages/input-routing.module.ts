import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentComponent } from './payment/payment.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputPagesRoutingModule {}
