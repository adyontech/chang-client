// This file will contain all the company wise function to make a single call to backend,
// we will merge them in  a single request and call the backend.
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';
// import { paramIdValue } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
import { VariableAst } from '@angular/compiler';
@Injectable()
export class GlobalCompanyService {
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
  // setParamId(value) {
  //   this._globalVariableService.paramId = value;
  // }

  getGlobalCompanyData(compName, owner) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/getGlobalCompanyData?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.get(this._url);
  }

  dateRangeValidator(value, minD, maxD) {
    // console.log(value);
    // console.log(minD);
    // console.log(maxD);
    if (value.year >= minD.year && value.year <= maxD.year) {
      if (value.month >= minD.month && value.month <= maxD.month) {
        if (value.day >= minD.day && value.day <= maxD.day) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
