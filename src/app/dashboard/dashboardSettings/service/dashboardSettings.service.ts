import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from './../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class DashboardSettingService {
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
    this.token = JSON.parse(window.localStorage.getItem('user')).token;
    this.getUsers();
  }

  setParamId(value) {
    this._globalVariableService.paramId = value;
  }

  getUsers() {
    this._url = `${this._globalVariableService.baseServerUrl}/uapi/userlist?token=${this.token}`;
    return this.http.get(this._url);
  }

  getCollabList(compName, owner) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/gatewayCollabList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.get(this._url);
  }

  collabAddWrite(user, compName, owner) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/gatewayCollabAddWrite?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.patch(this._url, user);
  }

  collabAddRead(user, compName, owner) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/gatewayCollabAddRead?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.patch(this._url, user);
  }

  removeReadHelper(id, role, compName, owner) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/removeReadHelper?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.post(this._url, { removeId: id });
  }

  removeWriteHelper(id, role, compName, owner) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/removeWriteHelper?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.post(this._url, { removeId: id });
  }
}
