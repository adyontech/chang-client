import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EditRoutingModule } from './edit-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditCompanyComponent } from './editCompany/editCompany.component';

import { GatewayService } from './editCompany/service/editGateway.service';
import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';
import { ToastrService } from './../../utilities/toastr.service';
import { StateVaribles } from './../../shared/forms/States';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    EditRoutingModule,
    FormsModule,
    ChartistModule,
    AgmCoreModule,
    NgbModule,
  ],
  declarations: [EditCompanyComponent],
  providers: [GatewayService, GlobalVaribles, ToastrService, StateVaribles],
})
export class EditPagesModule {}
