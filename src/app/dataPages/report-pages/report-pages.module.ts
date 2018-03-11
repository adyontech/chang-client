import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReportPagesRoutingModule } from './report-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CashAtBankComponent } from './cashAtBank/cashAtBank.component';
import { CashInHandsComponent } from './cashInHands/cashInHands.component';
import { ContraComponent } from './contra/contra.component';
import { LedgerComponent } from './ledger/ledger.component';
import { JournalEntryComponent } from './journalEntry/journalEntry.component';
import { PaymentComponent } from './payment/payment.component';

import { PopPaymentComponent } from './_popComponent/payment/popPayment.component';

import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';

import { CashAtBankService } from './cashAtBank/service/cashAtBank.service';
import { CashInHandsService } from './cashInHands/service/cashInHands.service';
import { ContraService } from './contra/service/contra.service';
import { JournalEntryService } from './journalEntry/service/journalEntry.service';
import { LedgerService } from './ledger/service/ledger.service';
import { PaymentService } from './payment/service/payment.service';
import { PopPaymentService } from './_popComponent/payment/service/popPayment.service';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    CommonModule,
    ReportPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgbModule,
    NgSelectModule,
  ],
  declarations: [
    LedgerComponent,
    JournalEntryComponent,
    PaymentComponent,
    PopPaymentComponent,
    CashAtBankComponent,
    CashInHandsComponent,
    ContraComponent,
  ],
  providers: [
    GlobalVaribles,

    CashAtBankService,
    CashInHandsService,
    ContraService,
    JournalEntryService,
    LedgerService,
    PaymentService,

    PopPaymentService,
  ],
})
export class ReportPagesModule {}
