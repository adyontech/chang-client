import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InputPagesRoutingModule } from './input-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PaymentComponent } from './payment/payment.component';

import { InputFormService } from './service/input-pages.service';
import { PaymentService } from './payment/service/payment.service';
@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    CommonModule,
    InputPagesRoutingModule,
    FormsModule,
    ChartistModule,
    AgmCoreModule,
    NgbModule,
  ],
  declarations: [PaymentComponent],
  providers: [InputFormService, PaymentService],
})
export class InputPagesModule {}
