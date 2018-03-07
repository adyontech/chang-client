import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LedgerComponent } from './ledger/ledger.component';
import { JournalEntryComponent } from './journalEntry/journalEntry.component';
import { PaymentComponent } from './payment/payment.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ledger',
        component: LedgerComponent,
        data: {
          title: 'Ledger',
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
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment Page',
        },
      },
      {
        path: 'verticaltimeline',
        // component: VerticalTimelinePageComponent,
        data: {
          title: 'Vertical Timeline Page',
        },
      },
      {
        path: 'profile',
        // component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page',
        },
      },
      {
        path: 'search',
        // component: SearchComponent,
        data: {
          title: 'Search',
        },
      },
      {
        path: 'faq',
        // component: FaqComponent,
        data: {
          title: 'FAQ',
        },
      },
      {
        path: 'kb',
        // component: KnowledgeBaseComponent,
        data: {
          title: 'Knowledge Base',
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
