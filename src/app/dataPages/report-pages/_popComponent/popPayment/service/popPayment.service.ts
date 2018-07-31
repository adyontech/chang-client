import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from '../../../../../shared/globalVariables/globalVariable';
// import { paramIdValue } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class PopPaymentService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _globalVariableService: GlobalVaribles // public _paramId = paramIdValue
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
  }

  getData(compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/uglist?token=${this.token}&&companyName=${compName}`;
    return this.http.get(this._url);
  }

  getPaymentFormData(compName, id: string) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/paymentFormData?token=${
      this.token
    }&&compName=${compName}&&dataId=${id}`;
    return this.http.get(this._url);
  }

  createNewEntry(user: any, compName) {
    const form = new FormData();
    for (const key of Object.keys(user)) {
      if (user[key] instanceof Array || user[key] instanceof Object) {
        form.append(key, JSON.stringify(user[key]));
      } else {
        form.append(key, user[key]);
      }
    }
    this._url = `${this._globalVariableService.baseServerUrl}/api/payment?token=${this.token}&companyName=${compName}`;
    return this.http.post(this._url, form).map((res: Response) => {
      this.result = res.json();
    });
  }

  editEntry(user: any, compName, paymentId) {
    const form = new FormData();
    for (const key of Object.keys(user)) {
      if (user[key] instanceof Array || user[key] instanceof Object) {
        form.append(key, JSON.stringify(user[key]));
      } else {
        form.append(key, user[key]);
      }
    }
    this._url = `${this._globalVariableService.baseServerUrl}/api/paymentEdit?token=${
      this.token
    }&&companyName=${compName}&&paymentId=${paymentId}`;
    return this.http.patch(this._url, form).map((res: Response) => {
      this.result = res.json();
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
