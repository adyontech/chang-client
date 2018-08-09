import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from '../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class ContributorService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    public _globalVariableService: GlobalVaribles,
    public _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastsManager
  ) {
    this.token = JSON.parse(window.localStorage.getItem('user')).token;
    this.getUsers();
  }

  typeSuccess(message) {
    this.toastr.success(message.message, 'Success!');
  }

  typeError(message) {
    this.toastr.success(message.message, 'Error!');
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
    this._url = `${this._globalVariableService.baseServerUrl}/api/collabAddWrite?token=${this.token}`;
    return this.http.patch(this._url, user).map((res: Response) => {
      this.result = res.json();
      return this.result;
    });
  }

  collabAddRead(user) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/collabAddRead?token=${this.token}`;
    return this.http.patch(this._url, user);
  }

  removeReadHelper(id, role) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/removeReadHelper?token=${this.token}`;
    return this.http.post(this._url, {id: id, role: role});
  }
  removeWriteHelper(id, role) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/removeWriteHelper?token=${this.token}`;
    return this.http.post(this._url, {id: id, role: role});
  }
}
