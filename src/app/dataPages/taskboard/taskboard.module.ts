import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragulaModule } from 'ng2-dragula';
import { TaskboardRoutingModule } from './taskboard-routing.module';
import { AvatarModule } from 'ngx-avatar';

import { TaskboardComponent } from './taskboard.component';
import { GlobalVaribles } from '../../shared/globalVariables/globalVariable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    DndModule,
    CommonModule,
    TaskboardRoutingModule,
    DragulaModule,
    AvatarModule,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [TaskboardComponent],
  providers: [GlobalVaribles],
})
export class TaskboardModule {}
