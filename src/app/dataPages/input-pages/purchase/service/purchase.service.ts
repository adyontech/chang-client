import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class PurchaseService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    public _globalVariableService: GlobalVaribles
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
  }
  createNewEntry(user: any, compName, ownerName) {
    const form = new FormData();
    for (const key of Object.keys(user)) {
      if (
        key !== 'attachment' &&
        (user[key] instanceof Array || user[key] instanceof Object)
      ) {
        form.append(key, JSON.stringify(user[key]));
      } else {
        form.append(key, user[key]);
      }
    }
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/purchase?token=${
      this.token
    }&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, form).map((res: Response) => {
      return (this.result = res.json());
    });
  }
  getLedgerUGNames(compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/ledgerNameList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }
  getPurchaseUGNames(compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/purchaseLedgerList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  getprsrList(compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/prsrList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }
}
