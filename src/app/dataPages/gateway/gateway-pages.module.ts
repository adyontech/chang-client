import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GatewayRoutingModule } from './gateway-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShowCompanyComponent } from './showCompany/showCompany.component';
import { AddCompanyComponent } from './addCompany/addCompany.component';

import { AddCompanyService } from './addCompany/service/addCompany.service';
import { ShowCompanyService } from './showCompany/service/showCompany.service';

@NgModule({
  imports: [CommonModule, GatewayRoutingModule, FormsModule, ChartistModule, AgmCoreModule, NgbModule],
  declarations: [ShowCompanyComponent, AddCompanyComponent],
  providers: [AddCompanyService, ShowCompanyService],
})
export class GatewayPagesModule {}
