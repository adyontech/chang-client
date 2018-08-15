import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from '../../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class PopJournalEntryService {
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

  getLedgerNames(compName, owner) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/ledgerNameList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.get(this._url);
  }

  getFormData(compName, id: string, owner) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/journalFormData?token=${
      this.token
    }&&compName=${compName}&&dataId=${id}&&ownerName=${owner}`;
    return this.http.get(this._url);
  }

  createNewEntry(user: any, compName, owner) {
    const form = new FormData();
    for (const key of Object.keys(user)) {
      if (user[key] instanceof Array || user[key] instanceof Object) {
        form.append(key, JSON.stringify(user[key]));
      } else {
        form.append(key, user[key]);
      }
    }
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/journalEntry?token=${
      this.token
    }&companyName=${compName}&&ownerName=${owner}`;
    return this.http.post(this._url, form).map((res: Response) => {
      this.result = res.json();
    });
  }

  editEntry(user: any, compName, docId, owner) {
    const form = new FormData();
    for (const key of Object.keys(user)) {
      if (user[key] instanceof Array || user[key] instanceof Object) {
        form.append(key, JSON.stringify(user[key]));
      } else {
        form.append(key, user[key]);
      }
    }
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/journalEdit?token=${
      this.token
    }&&companyName=${compName}&&docId=${docId}&&ownerName=${owner}`;
    return this.http.patch(this._url, form).map((res: Response) => {
      this.result = res.json();
    });
  }
}
