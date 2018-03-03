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

import { GalleryPageComponent } from './gallery/gallery-page.component';
import { InvoicePageComponent } from './invoice/invoice-page.component';
import { HorizontalTimelinePageComponent } from './timeline/horizontal/horizontal-timeline-page.component';
import { VerticalTimelinePageComponent } from './timeline/vertical/vertical-timeline-page.component';
import { UserProfilePageComponent } from './user-profile/user-profile-page.component';
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';

import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';

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
    GalleryPageComponent,
    InvoicePageComponent,
    HorizontalTimelinePageComponent,
    VerticalTimelinePageComponent,
    UserProfilePageComponent,
    SearchComponent,
    FaqComponent,
    KnowledgeBaseComponent,
  ],
})
export class ReportPagesModule {}
