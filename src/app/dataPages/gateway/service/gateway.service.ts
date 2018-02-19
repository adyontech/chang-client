import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class GatewayService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(private http: HttpClient, public _globalVariableService: GlobalVaribles) {
    this.setToken();
  }

  setToken() {
    const windowStorage = JSON.parse(window.localStorage.getItem('user'));
    if (windowStorage === null) {
      // redirecction code;
    } else {
      this.token = windowStorage.token;
      console.log(this.windowStorage);
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
