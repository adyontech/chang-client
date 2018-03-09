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
// import { Dashboard1Component } from './dashboard1/dashboard1.component';
// import { Dashboard2Component } from './dashboard2/dashboard2.component';

@NgModule({
  imports: [CommonModule, HttpModule, DashboardRoutingModule, ChartistModule, NgbModule, MatchHeightModule],
  exports: [],
  declarations: [
    DashboardComponent,
    // Dashboard1Component,
    // Dashboard2Component
  ],
  providers: [DashboardService, GlobalVaribles],
})
export class DashboardModule {}
