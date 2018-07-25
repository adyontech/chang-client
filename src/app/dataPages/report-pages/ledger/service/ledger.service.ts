import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class LedgerService {
  result: {};
  token: string;
  windowStorage: any;
  ledgerName: string;
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

  getLedgerNames(compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/ledgerNameList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }
  getIncomingData(compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/ledgerformData?token=${
      this.token
    }&&companyName=${compName}&&ledgerName=${
      this.ledgerName
    }&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }
}
