import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesBulkComponent } from './sales/sales.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sales',
        component: SalesBulkComponent,
        data: {
          title: 'edit company Page',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BulkRoutingModule {}
