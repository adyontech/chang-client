import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from '../../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class PopSalesService {
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
  createNewEntry(user: any, compName, ownerName) {
    const form = new FormData();
    for (const key of Object.keys(user)) {
      if (user[key] instanceof Array || user[key] instanceof Object) {
        form.append(key, JSON.stringify(user[key]));
      } else {
        form.append(key, user[key]);
      }
    }
    this._url = `${this._globalVariableService.baseServerUrl}/api/sales?token=${
      this.token
    }&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, form).map((res: Response) => {
      this.result = res.json();
    });
  }

  editEntry(user: any, compName, docId, ownerName) {
    const form = new FormData();
    for (const key of Object.keys(user)) {
      if (user[key] instanceof Array || user[key] instanceof Object) {
        form.append(key, JSON.stringify(user[key]));
      } else {
        form.append(key, user[key]);
      }
    }
    this._url = `${this._globalVariableService.baseServerUrl}/api/salesEdit?token=${
      this.token
    }&&companyName=${compName}&&docId=${docId}&&ownerName=${ownerName}`;
    return this.http.patch(this._url, form).map((res: Response) => {
      this.result = res.json();
    });
  }

  getSalesFormData(compName, id: string, ownerName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/salesFormData?token=${
      this.token
    }&&compName=${compName}&&dataId=${id}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  getLedgerUGNames(compName, ownerName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/ledgerNameList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }
  getSalesUGNames(compName, ownerName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/salesLedgerList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  getprsrList(compName, ownerName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/prsrList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }
}
