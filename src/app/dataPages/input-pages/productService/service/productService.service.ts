import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class ProductServiceService {
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

  getprsrList(compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/prsr?token=${this.token}&&companyName=${
      compName
    }`;
    return this.http.get(this._url);
  }

  createNewPrsr(user: any, compName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/prsr?token=${this.token}&companyName=${
      compName
    }`;
    return this.http.post(this._url, user).map((res: Response) => {
      this.result = res.json();
      // console.log(this.result)
    });
  }
}
