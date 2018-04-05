import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/service/dashboard.service';
import { GlobalVaribles } from './../shared/globalVariables/globalVariable';
import { DashboardSettingsComponent } from './dashboardSettings/dashboardSettings.component';
import { DeleteCompanyService } from './deleteCompany/service/deleteCompany.service';
import { DashboardSettingService } from './dashboardSettings/service/dashboardSettings.service';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { DeleteCompanyComponent } from './deleteCompany/deleteCompany.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    HttpModule,
    DashboardRoutingModule,
    ChartistModule,
    NgbModule,
    MatchHeightModule,
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    NgbModule,
    NgSelectModule,
  ],
  exports: [],
  declarations: [DashboardComponent, DashboardSettingsComponent, Dashboard2Component, DeleteCompanyComponent],
  providers: [DashboardService, GlobalVaribles, DashboardSettingService, DeleteCompanyService],
})
export class DashboardModule {}
