import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { AvatarModule } from 'ngx-avatar';
import { ChatRoutingModule } from './chat-routing.module';

import { GlobalCompanyService } from './../../shared/globalServices/oneCallvariables.servce';
import { ChatComponent } from './chat.component';

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
  ],
  declarations: [ChatComponent],
  providers: [GlobalCompanyService],
})
export class ChatModule {}
