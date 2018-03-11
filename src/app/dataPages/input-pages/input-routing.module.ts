import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContraComponent } from './contra/contra.component';
import { JournalEntryComponent } from './journalEntry/journalEntry.component';
import { LedgerComponent } from './ledger/ledger.component';
import { PaymentComponent } from './payment/payment.component';
import { Payment1Component } from './payment.1/payment1.component';
import { ProductServiceComponent } from './productService/productService.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseReturnComponent } from './purchaseReturn/purchaseReturn.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { SalesComponent } from './sales/sales.component';
import { SalesReturnComponent } from './salesReturn/salesReturn.component';
import { UnderGroupComponent } from './undergroup/undergroup.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contra',
        component: ContraComponent,
        data: {
          title: 'under group Page',
        },
      },
      {
        path: 'journal',
        component: JournalEntryComponent,
        data: {
          title: 'under group Page',
        },
      },
      {
        path: 'ledger',
        component: LedgerComponent,
        data: {
          title: 'ledger Page',
        },
      },
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'payment Page',
        },
      },{
        path: 'payment1',
        component: Payment1Component,
        data: {
          title: 'payment Page',
        },
      },
      {
        path: 'productservice',
        component: ProductServiceComponent,
        data: {
          title: 'under group Page',
        },
      },
      {
        path: 'purchase',
        component: PurchaseComponent,
        data: {
          title: 'purchase',
        },
      },
      {
        path: 'purchasereturn',
        component: PurchaseReturnComponent,
        data: {
          title: 'under group Page',
        },
      },
      {
        path: 'receipt',
        component: ReceiptComponent,
        data: {
          title: 'under group Page',
        },
      },
      {
        path: 'sales',
        component: SalesComponent,
        data: {
          title: 'under group Page',
        },
      },
      {
        path: 'salesreturn',
        component: SalesReturnComponent,
        data: {
          title: 'under group Page',
        },
      },
      {
        path: 'undergroup',
        component: UnderGroupComponent,
        data: {
          title: 'under group Page',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputPagesRoutingModule {}
