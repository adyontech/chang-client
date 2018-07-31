import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';

@Injectable()
export class ChatSidebarService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;
  socket: any;
  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _globalVariableService: GlobalVaribles
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
    this.socket = io(`${this._globalVariableService.baseChatServerUrl}`);
  }
}
