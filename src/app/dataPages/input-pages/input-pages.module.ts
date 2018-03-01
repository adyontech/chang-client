import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InputPagesRoutingModule } from './input-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PaymentComponent } from './payment/payment.component';
import { LedgerComponent } from './ledger/ledger.component';
import { UnderGroupComponent } from './undergroup/undergroup.component';

import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';
import { PaymentService } from './payment/service/payment.service';
import { LedgerService } from './ledger/service/ledger.service';
import { UnderGroupsService } from './undergroup/service/underGroup.service';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    CommonModule,
    InputPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgbModule,
    NgSelectModule,
  ],
  declarations: [PaymentComponent, LedgerComponent, UnderGroupComponent],
  providers: [PaymentService, LedgerService, UnderGroupsService, GlobalVaribles],
})
export class InputPagesModule {}
