import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class EditProfileService {
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
      // console.log(this.token);
    }
  }
  updateProfile(user: any) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/profileUpdate?token=${this.token}`;
    return this.http.patch(this._url, user).map((res: Response) => {
      this.result = res.json();
      console.log(this.result);
    });
  }

  fetchDetails() {
    this._url = `${this._globalVariableService.baseServerUrl}/api/whoami?token=${this.token}`;
    return this.http.get(this._url);
  }

  //   removeCompany(id) {
  //     return this.http.delete(this._url + '/' + id).map((res: Response) => res.json());
  //   }
}
