import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class ContributorService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: HttpClient,
    public _globalVariableService: GlobalVaribles,
    public _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const windowStorages = JSON.parse(window.localStorage.getItem('user'));
    console.log(JSON.parse(window.localStorage.getItem('user')))
    this.getUsers();
  }

  getUsers() {
    this._url = `${this._globalVariableService.baseServerUrl}/uapi/userlist?token=${this.token}`;
    return this.http.get(this._url);
  }
}
