import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { HttpModule } from '@angular/http';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/service/dashboard.service';
import { GlobalVaribles } from './../shared/globalVariables/globalVariable';
import { DashboardSettingsComponent } from './dashboardSettings/dashboardSettings.component';
// import { Dashboard2Component } from './dashboard2/dashboard2.component';

@NgModule({
  imports: [CommonModule, HttpModule, DashboardRoutingModule, ChartistModule, NgbModule, MatchHeightModule],
  exports: [],
  declarations: [
    DashboardComponent,
    DashboardSettingsComponent,
    // Dashboard2Component
  ],
  providers: [DashboardService, GlobalVaribles],
})
export class DashboardModule {}
