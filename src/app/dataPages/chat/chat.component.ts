import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';
import { ActivatedRoute } from '@angular/router';
import { GlobalCompanyService } from './../../shared/globalServices/oneCallvariables.servce';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService],
})
export class ChatComponent implements OnInit {
  chat: Chat[];
  dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public roomId;
  public messageArray = [];

  public message;

  @ViewChild('messageInput') messageInputRef: ElementRef;

  messages = new Array();
  item: Number = 0;
  constructor(
    private elRef: ElementRef,
    private _chatService: ChatService,
    private route: ActivatedRoute,
    public _globalCompanyService: GlobalCompanyService
  ) {
    this._chatService.newMessageReceived().subscribe(data => console.log(data));
  }

  ngOnInit() {
    this.getRouteParam();
    this.getGlobalCompanyData();
    $.getScript('./assets/js/chat.js');
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.roomId = data.companyId;
        this.join();
      });
  }

  join() {
    this._chatService.joinRoom(this.roomId);
  }

  // newUserJoin() {
  //   this._chatService
  //     .newUserJoined()
  //     .subscribe(data => this.messageArray.push(data));
  // }

  // send button function calls
  onAddMessage() {
    this._chatService.onAddMessage(this.roomId, this.message);
  }
}
