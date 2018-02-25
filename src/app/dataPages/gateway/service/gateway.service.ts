import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class GatewayService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: HttpClient,
    public _globalVariableService: GlobalVaribles,
    public _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setToken();
  }

  setToken() {
    const windowStorages = JSON.parse(window.localStorage.getItem('user'));
    if (windowStorages === null || windowStorages === undefined) {
      // redirection code;
      this.router.navigate(['/app/login']);
    } else {
      // console.log(windowStorages)
      this.token = windowStorages;
      console.log(this.token)
    }
  }
  createNewCompany(user: any) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/gateway?token=${this.token}`;
    return this.http.post(this._url, user).map((res: Response) => {
      this.result = res.json();
      console.log(this.result);
    });
  }

  getCompanyList() {
    this._url = `${this._globalVariableService.baseServerUrl}/api/gatewaylist?token=${this.token}`;
    return this.http.get(this._url);
  }

  removeCompany(id) {
    return this.http.delete(this._url + '/' + id).map((res: Response) => res.json());
  }
}
