import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DragulaModule } from "ng2-dragula";
import { TaskboardRoutingModule } from "./taskboard-routing.module";
import { AvatarModule } from "ngx-avatar";

import { TaskboardComponent } from "./taskboard.component";
import { GlobalVaribles } from "./../../../app/shared/globalVariables/globalVariable";

@NgModule({
  imports: [CommonModule, TaskboardRoutingModule, DragulaModule, AvatarModule],
  declarations: [TaskboardComponent],
  providers: [GlobalVaribles]
})
export class TaskboardModule {}
