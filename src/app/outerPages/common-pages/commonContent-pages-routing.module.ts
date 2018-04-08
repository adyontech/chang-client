import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmComponent } from './confirm/confirm.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mojo',
        component: ConfirmComponent,
        data: {
          title: 'Mojo',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonContentPagesRoutingModule {}
