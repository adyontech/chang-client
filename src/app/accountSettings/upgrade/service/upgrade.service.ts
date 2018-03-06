import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class UpgradeService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _globalVariableService: GlobalVaribles ,
    // public _paramId = paramIdValue
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
  }
  setParamId(value) {
    this._globalVariableService.paramId = value;
  }

  createNewEntry(user: any, compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/payment?token=${this.token}&companyName=${compName}`;
    return this.http.post(this._url, user).map((res: Response) => {
      this.result = res.json();
      // console.log(this.result)
    });
  }
}
