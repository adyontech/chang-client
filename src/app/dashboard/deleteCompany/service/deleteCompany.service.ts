import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class DeleteCompanyService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    public _globalVariableService: GlobalVaribles,
    public _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = JSON.parse(window.localStorage.getItem('user')).token;

  }

  setParamId(value) {
    this._globalVariableService.paramId = value;
  }
  deleteCompany(compName, owner) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/removeWriteHelper?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    console.log(this._url);
    return this.http.post(this._url, { ownerName: owner });
  }
}
