import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from '../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class EditProductServiceService {
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

  getprsrList(compName, ownerName) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/prsr?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.get(this._url);
  }

  getPrsrNamesId(compName, owner) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/prsrNameList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.get(this._url);
  }

  autoFillData(prsrName, compName, owner) {
    console.log(prsrName);
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/autoFillPrsrEditData?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}&&prsrName=${prsrName}`;
    return this.http.get(this._url);
  }

  editNewPrsr(user: any, compName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/editPrsr?token=${
      this.token
    }&companyName=${compName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, user).map((res: Response) => {
      return res.json();
    });
  }
}
