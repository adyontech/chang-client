import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class PasswordChangeService {
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
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    if (this.windowStorage === null || this.windowStorage === undefined) {
      this.router.navigate(['/app/login']);
    } else {
      this.token = this.windowStorage.token;
    }
  }

  changePassword(user: any) {
    this._url = `${this._globalVariableService.baseServerUrl}/auth/changePassword?token=${this.token}`;
    return this.http.patch(this._url, user).map((res: Response) => {
      this.result = res.json();
      console.log(this.result);
    });
  }
}
