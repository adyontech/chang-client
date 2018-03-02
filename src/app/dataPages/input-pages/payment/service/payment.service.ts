import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';
import { paramIdValue } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class PaymentService {
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

  getData(compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/uglist?token=${this.token}&&companyName=${compName}`;
    return this.http.get(this._url);
  }

  createNewEntry(user: any, compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/payment?token=${this.token}&companyName=${compName}`;
    return this.http.post(this._url, user).map((res: Response) => {
      this.result = res.json();
      // console.log(this.result)
    });
  }

  getLedgerUGNames(compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/ledgerNameList?token=${
      this.token
    }&&companyName=${compName}`;
    return this.http.get(this._url);
  }
  getAccountNames(compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/accountNameList?token=${
      this.token
    }&&companyName=${compName}`;
    return this.http.get(this._url);
  }
}
