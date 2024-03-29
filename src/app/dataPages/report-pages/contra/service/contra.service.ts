import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from '../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class ContraService {
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

  getIncomingData(selectionValue, companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/contraStored?token=${
      this.token
    }&&companyName=${companyName}&&selectionValue=${selectionValue}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  deleteEntry(id, companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/deleteContraEntry?token=${
      this.token
    }&&companyName=${companyName}&&deleteId=${id}&&ownerName=${ownerName}`;
    return this.http.delete(this._url);
    // return 0;
  }
}
