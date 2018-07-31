import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChatSidebarPeopleService } from './sideBarPeople.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalCompanyService } from '../../../shared/globalServices/oneCallvariables.servce';

@Component({
  selector: 'app-chat-people-sidebar',
  templateUrl: './sideBarPeople.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./../chat.component.scss'],
})
export class ChatSidebarComponent implements OnInit {
  dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public roomId;
  public userName = JSON.parse(window.localStorage.getItem('user')).userName;
  public message;

  messages = new Array();
  userList = [];
  item: Number = 0;
  constructor(
    private elRef: ElementRef,
    private _chatService: ChatSidebarPeopleService,
    private route: ActivatedRoute,
    public _globalCompanyService: GlobalCompanyService
  ) {
    // this.newMessageReceived();
    // this.oldMessages();
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
        this.getUserList();
      });
  }

  getUserList() {
    this.dataCopy = this._chatService
      .getUserList(this.roomId)
      .map(response => response.json())
      .subscribe(data => {
        this.userList = data.formData;
        console.log(this.userList);
      });
  }
}
