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
import { ArchwizardModule } from 'ng2-archwizard';
import { UiSwitchModule } from 'ngx-ui-switch';

import { CashAtBankComponent } from './cashAtBank/cashAtBank.component';
import { CashInHandsComponent } from './cashInHands/cashInHands.component';
import { ContraComponent } from './contra/contra.component';
import { LedgerComponent } from './ledger/ledger.component';
import { JournalEntryComponent } from './journalEntry/journalEntry.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductServiceComponent } from './productService/productService.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseReturnComponent } from './purchaseReturn/purchaseReturn.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { SalesComponent } from './sales/sales.component';
import { SalesReturnComponent } from './salesReturn/salesReturn.component';
import { TrialBalanceComponent } from './trialBalance/trialBalance.component';

import { PopPaymentComponent } from './_popComponent/payment/popPayment.component';

import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';

import { CashAtBankService } from './cashAtBank/service/cashAtBank.service';
import { CashInHandsService } from './cashInHands/service/cashInHands.service';
import { ContraService } from './contra/service/contra.service';
import { JournalEntryService } from './journalEntry/service/journalEntry.service';
import { LedgerService } from './ledger/service/ledger.service';
import { PaymentService } from './payment/service/payment.service';
import { ProductServiceService } from './productService/service/productService.service';
import { PurchaseService } from './purchase/service/purchase.service';
import { PurchaseReturnService } from './purchaseReturn/service/purchaseReturn.service';
import { ReceiptService } from './receipt/service/receipt.service';
import { SalesService } from './sales/service/sales.service';
import { SalesReturnService } from './salesReturn/service/salesReturn.service';
import { TrialBalanceService } from './trialBalance/service/trialBalance.service';

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
    ArchwizardModule,
    UiSwitchModule
  ],
  declarations: [
    CashAtBankComponent,
    CashInHandsComponent,
    ContraComponent,
    JournalEntryComponent,
    LedgerComponent,
    PaymentComponent,
    ProductServiceComponent,
    PurchaseComponent,
    PurchaseReturnComponent,
    ReceiptComponent,
    SalesComponent,
    SalesReturnComponent,
    TrialBalanceComponent,



    PopPaymentComponent,
  ],
  providers: [
    GlobalVaribles,

    CashAtBankService,
    CashInHandsService,
    ContraService,
    JournalEntryService,
    LedgerService,
    PaymentService,
    ProductServiceService,
    PurchaseService,
    PurchaseReturnService,
    ReceiptService,
    SalesService,
    SalesReturnService,
    TrialBalanceService,

    PopPaymentService,
  ],
})
export class ReportPagesModule {}
