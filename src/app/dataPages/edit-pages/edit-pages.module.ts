import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EditRoutingModule } from './edit-routing.module';
import { ChartistModule } from 'ng-chartist';
import { ArchwizardModule } from 'ng2-archwizard';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputPagesModule } from './../input-pages/input-pages.module';
import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';
import { ToastrService } from './../../utilities/toastr.service';
import { StateVaribles } from './../../shared/forms/States';
import { SharedModule } from './../../shared/shared.module';
import { EditCompanyComponent } from './editCompany/editCompany.component';
import { EditLedgerComponent } from './editLedger/editLedger.component';
import { EditProductServiceComponent } from './editProductService/editProductService.component';
import { EditUnderGroupComponent } from './editUndergroup/editUndergroup.component';
import { GatewayService } from './editCompany/service/editGateway.service';
import { EditLedgerService } from './editLedger/service/editLedger.service';
import { EditProductServiceService } from './editProductService/service/editProductService.service';
import { EditUnderGroupsService } from './editUndergroup/service/editUndergroup.service';
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
    InputPagesModule,
    SharedModule,
    ArchwizardModule,
  ],
  declarations: [
    EditCompanyComponent,
    EditProductServiceComponent,
    EditUnderGroupComponent,
    EditLedgerComponent,
  ],
  providers: [
    GatewayService,
    EditLedgerService,
    EditProductServiceService,
    EditUnderGroupsService,
    GlobalVaribles,
    ToastrService,
    StateVaribles,
  ],
})
export class EditPagesModule {}
