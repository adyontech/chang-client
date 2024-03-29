import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GatewayRoutingModule } from './gateway-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShowCompanyComponent } from './showCompany/showCompany.component';
import { AddCompanyComponent } from './addCompany/addCompany.component';

import { GatewayService } from './service/gateway.service';
import { GlobalVaribles } from '../../shared/globalVariables/globalVariable';
import { ToastrService } from '../../utilities/toastr.service';
import { StateVaribles } from '../../shared/forms/States';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    GatewayRoutingModule,
    FormsModule,
    ChartistModule,
    AgmCoreModule,
    NgbModule,
  ],
  declarations: [ShowCompanyComponent, AddCompanyComponent],
  providers: [GatewayService, GlobalVaribles, ToastrService, StateVaribles],
})
export class GatewayPagesModule {}
