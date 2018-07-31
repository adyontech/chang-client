import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from '../../../../shared/globalVariables/globalVariable';
// import { paramIdValue } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class ConfirmService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _globalVariableService: GlobalVaribles // public _paramId = paramIdValue
  ) {}
  confirmPayment(paymentId, paymentReqId) {
    this._url = `${this._globalVariableService.baseServerUrl}/pays/confirmPayment`;
    return this.http.post(this._url, { paymentId: paymentId, paymentReqId: paymentReqId }).map((res: Response) => {
     return  this.result = res.json();
    });
  }
}
