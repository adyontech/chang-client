import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class DashboardSettingService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    public _globalVariableService: GlobalVaribles,
    public _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = JSON.parse(window.localStorage.getItem('user')).token;
    this.getUsers();
  }


  setParamId(value) {
    this._globalVariableService.paramId = value;
  }

  getUsers() {
    this._url = `${this._globalVariableService.baseServerUrl}/uapi/userlist?token=${this.token}`;
    return this.http.get(this._url);
  }

  getCollabList() {
    this._url = `${this._globalVariableService.baseServerUrl}/api/collabList?token=${this.token}`;
    return this.http.get(this._url);
  }

  collabAddWrite(user) {
    console.log(user);
    this._url = `${this._globalVariableService.baseServerUrl}/api/collabAddWrite?token=${this.token}`;
    console.log(this._url);
    return this.http.patch(this._url, user);
  }

  collabAddRead(user) {
    console.log(user);
    this._url = `${this._globalVariableService.baseServerUrl}/api/collabAddRead?token=${this.token}`;
    console.log(this._url);
    return this.http.patch(this._url, user);
  }
}
