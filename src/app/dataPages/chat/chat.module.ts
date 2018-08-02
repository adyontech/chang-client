import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { ChatRoutingModule } from './chat-routing.module';

import { GlobalCompanyService } from '../../shared/globalServices/oneCallvariables.servce';
import { ChatComponent } from './chat.component';
// import { ChatSidebarComponent } from './sideBar/chatSidebar.component';
// import { ChatSidebarService } from './sideBar/chatSidebar.service';
import { ChatSidebarMessageComponent } from './sideBarStarMess/sideBarStarMess.component';
import { ChatSidebarMessageService } from './sideBarStarMess/sideBarStarMess.service';
import { ChatSidebarComponent } from './sideBarPeople/sideBarPeople.component';
import { ChatSidebarPeopleService } from './sideBarPeople/sideBarPeople.service';

@NgModule({
  imports: [
    AvatarModule,
    CommonModule,
    ChatRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [
    ChatComponent,
    ChatSidebarComponent,
    ChatSidebarMessageComponent,
  ],
  providers: [
    GlobalCompanyService,
    ChatSidebarMessageService,
    ChatSidebarPeopleService,
    NgbTabsetConfig,
  ],
})
export class ChatModule {}
