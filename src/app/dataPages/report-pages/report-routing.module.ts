import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashAtBankComponent } from './cashAtBank/cashAtBank.component';
import { CashInHandsComponent } from './cashInHands/cashInHands.component';
import { ContraComponent } from './contra/contra.component';
import { JournalEntryComponent } from './journalEntry/journalEntry.component';
import { LedgerComponent } from './ledger/ledger.component';
import { PaymentComponent } from './payment/payment.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { SalesComponent } from './sales/sales.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cashatbank',
        component: CashAtBankComponent,
        data: {
          title: 'cashatback',
        },
      },
      {
        path: 'cashinhand',
        component: CashInHandsComponent,
        data: {
          title: 'Cashinhands',
        },
      },
      {
        path: 'contra',
        component: ContraComponent,
        data: {
          title: 'contra',
        },
      },
      {
        path: 'journal',
        component: JournalEntryComponent,
        data: {
          title: 'journal entry',
        },
      },
      {
        path: 'ledger',
        component: LedgerComponent,
        data: {
          title: 'Ledger',
        },
      },
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment Page',
        },
      },
      {
        path: 'sales',
        component: SalesComponent,
        data: {
          title: 'Sales Page',
        },
      },
      {
        path: 'receipt',
        component: ReceiptComponent,
        data: {
          title: 'Sales Page',
        },
      },
      {
        path: 'sales',
        component: SalesComponent,
        data: {
          title: 'Sales Page',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPagesRoutingModule {}
