import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { GlobalVaribles } from '../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../utilities/toastr.service';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class CheckoutService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _globalVariableService: GlobalVaribles,
    public _toastrService: ToastrService
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
  }
  setParamId(value) {
    this._globalVariableService.paramId = value;
  }

  fetchDetails() {
    this._url = `${this._globalVariableService.baseServerUrl}/api/whoami?token=${this.token}`;
    return this.http.get(this._url);
  }

  requestPayment(pack: any) {
    this._toastrService.typeWarning('Processing the requirements');
    this._url = `${this._globalVariableService.baseServerUrl}/pay/instamojo?token=${this.token}`;
    return this.http.post(this._url, { packName: pack }).map((res: Response) => {
     return this.result = res.json();
    });
  }
}
