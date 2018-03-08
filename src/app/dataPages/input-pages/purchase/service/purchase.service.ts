import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class PurchaseService {
  private paramCompanyName: string;
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _globalVariableService: GlobalVaribles
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
  }
  createNewEntry(user: any, compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/purchaseReturn?token=${
      this.token
    }&companyName=${compName}`;
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
  getPurchaseUGNames(compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/purchaseLedgerList?token=${
      this.token
    }&&companyName=${compName}`;
    return this.http.get(this._url);
  }

  getprsrList(compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/prsrList?token=${
      this.token
    }&&companyName=${compName}`;
    return this.http.get(this._url);
  }
}
