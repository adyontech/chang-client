import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InputPagesRoutingModule } from './input-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'ng2-archwizard';

import { BreadcrumbsComponent } from '../../breadcrumbs/breadcrumbs.component';
import { ContraComponent } from './contra/contra.component';
import { JournalEntryComponent } from './journalEntry/journalEntry.component';
import { LedgerComponent } from './ledger/ledger.component';
import { PaymentComponent } from './payment/payment.component';
// import { Payment1Component } from './payment.1/payment1.component';
import { ProductServiceComponent } from './productService/productService.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseReturnComponent } from './purchaseReturn/purchaseReturn.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { SalesComponent } from './sales/sales.component';
import { SalesReturnComponent } from './salesReturn/salesReturn.component';
import { UnderGroupComponent } from './undergroup/undergroup.component';

import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';
import { ContraService } from './contra/service/contra.service';
import { JournalEntryService } from './journalEntry/service/journalEntry.service';
import { LedgerService } from './ledger/service/ledger.service';
import { PaymentService } from './payment/service/payment.service';
// import { Payment1Service } from './payment.1/service/payment1.service';
import { ProductServiceService } from './productService/service/productService.service';
import { PurchaseService } from './purchase/service/purchase.service';
import { PurchaseReturnService } from './purchaseReturn/service/purchaseReturn.service';
import { ReceiptService } from './receipt/service/receipt.service';
import { SalesService } from './sales/service/sales.service';
import { SalesReturnService } from './salesReturn/service/salesReturn.service';
import { UnderGroupsService } from './undergroup/service/underGroup.service';
import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';
import { StateVaribles } from './../../shared/forms/States';
import { GlobalCompanyService } from './../../shared/globalServices/oneCallvariables.servce';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  exports: [LedgerComponent, UnderGroupComponent],
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
    ArchwizardModule,
    NgSelectModule,
    UiSwitchModule,
  ],
  declarations: [
    BreadcrumbsComponent,
    ContraComponent,
    JournalEntryComponent,
    LedgerComponent,
    PaymentComponent,
    // Payment1Component,
    ProductServiceComponent,
    PurchaseComponent,
    PurchaseReturnComponent,
    ReceiptComponent,
    SalesComponent,
    SalesReturnComponent,
    UnderGroupComponent,
  ],
  providers: [
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
    UnderGroupsService,
    GlobalVaribles,
    BreadcrumbsService,
    StateVaribles,
    GlobalCompanyService,
  ],
})
export class InputPagesModule {}
