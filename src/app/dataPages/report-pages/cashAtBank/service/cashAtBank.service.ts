import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from '../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class CashAtBankService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;
  contentId: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _globalVariableService: GlobalVaribles
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
  }

  getIncomingData(ledgerName, compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/cashAtBank?token=${
      this.token
    }&&companyName=${compName}&&ledgerSelect=${ledgerName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  getLedgerNameData(compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/ledgerNamecashAtBank?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }
}
