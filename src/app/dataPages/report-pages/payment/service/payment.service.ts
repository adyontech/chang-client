import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class PaymentService {
  public paramCompanyName: string;
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
    // console.log(this.paramCompanyName)
  }

  getIncomingData(selectionValue) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/paymentStored2?token=${this.token}&&companyName=${
      this.paramCompanyName
    }&&selectionValue${selectionValue}`;
    return this.http.get(this._url);
  }
  getAllIncomingData() {
    this._url = `${this._globalVariableService.baseServerUrl}/api/paymentStored?token=${this.token}&&companyName=${
      this.paramCompanyName
    }`;
    return this.http.get(this._url);
  }
}
