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

import { LedgerComponent } from './ledger/ledger.component';
import { JournalEntryComponent } from './journalEntry/journalEntry.component';

import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';

import { LedgerService } from './ledger/service/ledger.service';
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
  declarations: [LedgerComponent, JournalEntryComponent],
  providers: [GlobalVaribles, LedgerService],
})
export class ReportPagesModule {}
