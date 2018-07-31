import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BulkRoutingModule } from './bulkUpload-routing.module';
import { ChartistModule } from 'ng-chartist';
import { ArchwizardModule } from 'ng2-archwizard';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputPagesModule } from '../input-pages/input-pages.module';
import { GlobalVaribles } from '../../shared/globalVariables/globalVariable';
import { ToastrService } from '../../utilities/toastr.service';
import { StateVaribles } from '../../shared/forms/States';
import { SharedModule } from '../../shared/shared.module';
import { SalesBulkComponent } from './sales/sales.component';

import { SalesBulkService } from './sales/service/sales.service';
@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    BulkRoutingModule,
    FormsModule,
    ChartistModule,
    AgmCoreModule,
    NgbModule,
    InputPagesModule,
    SharedModule,
    ArchwizardModule,
  ],
  declarations: [SalesBulkComponent],
  providers: [SalesBulkService, GlobalVaribles, ToastrService, StateVaribles],
})
export class BulkUploadPagesModule {}
