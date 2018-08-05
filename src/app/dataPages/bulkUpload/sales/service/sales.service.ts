import { Injectable } from '@angular/core';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from '../../../../shared/globalVariables/globalVariable';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
// import 'rxjs';
@Injectable()
export class SalesBulkService {
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
    this.setToken();
  }

  setToken() {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    if (this.windowStorage === null || this.windowStorage === undefined) {
      this.router.navigate(['/app/login']);
    } else {
      this.token = this.windowStorage.token;
    }
  }

  getLedgerNames(compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/ledgerNameList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  uploadBulk(user: any, companyName, ownerName) {
    console.log(user);
    // const form = new FormData();
    // for (const key of Object.keys(user)) {
    //   form.append(key, user[key]);
    // }
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/apibulk/bulksales?token=${
      this.token
    }&&companyName=${companyName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, user).map((res: Response) => {
      this.result = res.json();
      return (this.result = res.json());
    });
  }
}
