import { Injectable } from '@angular/core';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from '../../../shared/globalVariables/globalVariable';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class GatewayService {
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
  createNewCompany(user: any) {
    console.log(user);
    const form = new FormData();
    for (const key of Object.keys(user)) {
      form.append(key, user[key]);
    }
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/gateway?token=${this.token}`;
    return this.http.post(this._url, form).map((res: Response) => {
      this.result = res.json();
      return (this.result = res.json());
    });
  }

  getCompanyList() {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/gatewaylist?token=${this.token}`;
    return this.http.get(this._url);
  }

  removeCompany(id) {
    return this.http
      .delete(this._url + '/' + id)
      .map((res: Response) => res.json());
  }
}
