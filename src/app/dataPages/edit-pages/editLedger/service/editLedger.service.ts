import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class EditLedgerService {
  // private paramCompanyName: string;
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

  getUnderGroupList(companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/uglist?token=${
      this.token
    }&&companyName=${companyName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  getLedgerNamesId(compName, owner) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/ledgerNameList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.get(this._url);
  }

  autoFillData(ledgerName, compName, owner) {
    console.log(ledgerName);
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/autoFillData?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}&&ledgerName=${ledgerName}`;
    return this.http.get(this._url);
  }

  editNewLedger(user: any, companyName, ownerName) {
    const form = new FormData();
    for (const key of Object.keys(user)) {
      form.append(key, user[key]);
    }
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/editLedger?token=${
      this.token
    }&companyName=${companyName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, user).map((res: Response) => {
      return res.json();
    });
  }
}
