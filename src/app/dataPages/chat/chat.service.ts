import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Chat } from './chat.model';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { GlobalVaribles } from '../../shared/globalVariables/globalVariable';

@Injectable()
export class ChatService {
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

  joinRoom(roomId) {
    this.socket.emit('join', {
      user: this.windowStorage.userName,
      roomId: roomId,
    });
  }

  onAddMessage(roomId, message) {
    this.socket.emit('message', {
      user: this.windowStorage.userName,
      roomId: roomId,
      message: message,
    });
  }

  starMessage(roomId, msgBody) {
    this.socket.emit('star message', {
      user: this.windowStorage.userName,
      roomId: roomId,
      msgBody: msgBody,
    });
  }

  newMessageReceived() {
    const observable = new Observable(observer => {
      this.socket.on('new message', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  oldMessages() {
    const observable = new Observable(observer => {
      this.socket.on('old messages', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
