import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChatSidebarMessageService } from './sideBarStarMess.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalCompanyService } from '../../../shared/globalServices/oneCallvariables.servce';

@Component({
  selector: 'app-chat-starmess',
  templateUrl: './sideBarStarMess.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./../chat.component.scss'],
})
export class ChatSidebarMessageComponent implements OnInit {
  dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public roomId;
  public userName = JSON.parse(window.localStorage.getItem('user')).userName;
  public message;
  public deleteAllow: Boolean = false;

  messages = new Array();
  item: Number = 0;
  constructor(
    private elRef: ElementRef,
    private _chatService: ChatSidebarMessageService,
    private route: ActivatedRoute,
    public _globalCompanyService: GlobalCompanyService
  ) {
    this.newStarMessageReceived();
    this.oldStarMessages();
  }

  ngOnInit() {
    this.getRouteParam();
    this.getGlobalCompanyData();
    $.getScript('./assets/js/chat.js');
  }

  deleteToggle() {
    this.deleteAllow = !this.deleteAllow;
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }
  joinStar() {
    this._chatService.joinStarRoom(this.roomId);
  }

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.roomId = data.companyId;
        this.joinStar();
      });
  }

  newStarMessageReceived() {
    this._chatService
      .newStarMessageReceived()
      .subscribe(data => console.log(data));
  }

  oldStarMessages() {
    this._chatService.oldStarMessages().subscribe(data => {
      console.log(data);
    });
  }
}
