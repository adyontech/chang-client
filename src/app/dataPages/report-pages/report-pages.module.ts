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
import { UnderGroupComponent } from './underGroup/underGroup.component';

import { PopContraComponent } from './_popComponent/contra/popContra.component';
import { PopJournalEntryComponent } from './_popComponent/popJournalEntry/journalEntry.component';
import { PopPaymentComponent } from './_popComponent/popPayment/popPayment.component';
import { PopPurchaseComponent } from './_popComponent/popPurchase/purchase.component';
import { PopPurchaseReturnComponent } from './_popComponent/popPurchaseReturn/purchaseReturn.component';
import { PopReceiptComponent } from './_popComponent/popReceipt/receipt.component';
import { PopSalesComponent } from './_popComponent/popSales/sales.component';
import { PopSalesReturnComponent } from './_popComponent/popSalesReturn/salesReturn.component';

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
import { UnderGroupsService } from './underGroup/service/underGroup.service';

import { PopContraContraService } from './_popComponent/contra/service/popContra.service';
import { PopJournalEntryService } from './_popComponent/popJournalEntry/service/journalEntry.service';
import { PopPaymentService } from './_popComponent/popPayment/service/popPayment.service';
import { PopPurchaseService } from './_popComponent/popPurchase/service/purchase.service';
import { PopPurchaseReturnService } from './_popComponent/popPurchaseReturn/service/purchaseReturn.service';
import { PopReceiptService } from './_popComponent/popReceipt/service/receipt.service';
import { PopSalesService } from './_popComponent/popSales/service/sales.service';
import { PopSalesReturnService } from './_popComponent/popSalesReturn/service/salesReturn.service';

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
    UiSwitchModule,
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
    UnderGroupComponent,

    PopContraComponent,
    PopJournalEntryComponent,
    PopPaymentComponent,
    PopPurchaseComponent,
    PopPurchaseReturnComponent,
    PopReceiptComponent,
    PopSalesComponent,
    PopSalesReturnComponent
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
    UnderGroupsService,

    PopContraContraService,
    PopJournalEntryService,
    PopPaymentService,
    PopPurchaseService,
    PopPurchaseReturnService,
    PopReceiptService,
    PopSalesService,
    PopSalesReturnService
  ],
})
export class ReportPagesModule {}
