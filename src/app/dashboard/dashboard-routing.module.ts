import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSettingsComponent } from './dashboardSettings/dashboardSettings.component';
import { DeleteCompanyComponent } from './deleteCompany/deleteCompany.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'settings',
        component: DashboardSettingsComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'delete',
        component: DeleteCompanyComponent,
        data: {
          title: 'delete',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
