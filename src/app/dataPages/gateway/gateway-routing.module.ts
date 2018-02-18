import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCompanyComponent } from './addCompany/addCompany.component';
import { ShowCompanyComponent } from './showCompany/showCompany.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ShowCompanyComponent,
        data: {
          title: 'ShowCompany Page',
        },
      },
      {
        path: 'addcompany',
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
export class GatewayRoutingModule {}
