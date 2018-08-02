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
import { GlobalCompanyService } from '../../shared/globalServices/oneCallvariables.servce';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

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
  public userName = JSON.parse(window.localStorage.getItem('user')).userName;
  public messageArray = [
    {
      date: '1532743506687',
      _id: '5b5bcf7ec244e86793ef2df8',
      sender: 'Proworktree',
      message: 'Hii, you can start your company related discussion here.',
    },
    {
      date: '1532743506687',
      _id: '5b5bcf7ec244e86793ef2df7',
      sender: 'Proworktree',
      message: 'Youll be needed to upgrade your package. Thanks',
      stared: true,
    },
    {
      date: '1532788910233',
      _id: '5b5c80b5b9c9356037beabfc',
      sender: 'aadii104',
      message: 'sss',
    },
    {
      date: '1532788910233',
      _id: '5b5c80d5b9c9356037beabfd',
      sender: 'aadii104',
      message: 'ss',
    },
    {
      date: '1532788910233',
      _id: '5b5c80e4b9c9356037beabfe',
      sender: 'aadii104',
      message: 'qwwqw',
    },
    {
      date: '1532789421557',
      _id: '5b5c82c5ddb57b65af42850d',
      sender: 'aadii104',
      message: 'das',
    },
  ];

  public message;

  @ViewChild('messageInput') messageInputRef: ElementRef;

  messages = new Array();
  item: Number = 0;
  constructor(
    config: NgbTabsetConfig,
    private elRef: ElementRef,
    private _chatService: ChatService,
    private route: ActivatedRoute,
    public _globalCompanyService: GlobalCompanyService
  ) {
    config.justify = 'center';
    config.type = 'pills';
    this.newMessageReceived();
    this.oldMessages();
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

  starMessage(arg) {
    console.log(arg);
    this._chatService.starMessage(this.roomId, arg);
  }

  join() {
    this._chatService.joinRoom(this.roomId);
  }

  // newUserJoin() {
  //   this._chatService
  //     .newUserJoined()
  //     .subscribe(data => this.messageArray.push(data));
  // }

  onAddMessage() {
    this._chatService.onAddMessage(this.roomId, this.message);
  }

  newMessageReceived() {
    this._chatService.newMessageReceived().subscribe(data => {
      // console.log(data);
    });
  }
  oldMessages() {
    this._chatService.oldMessages().subscribe((data: ChatArrayInt) => {
      // console.log(data);
    });
  }
}

interface ChatArrayInt {
  chatArray: Array<any>;
}
