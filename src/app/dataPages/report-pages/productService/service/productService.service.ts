import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalVaribles } from '../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class ProductServiceService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;

  constructor(
    private http: Http,
    public _globalVariableService: GlobalVaribles
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
  }

  getprsrList(companyName, ownerName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/prsr?token=${
      this.token
    }&&companyName=${companyName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  createNewPrsr(user: any, companyName, ownerName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/prsr?token=${
      this.token
    }&companyName=${companyName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, user).map((res: Response) => {
      return (this.result = res.json());
    });
  }
}
