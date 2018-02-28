import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { InputFormService } from './../../service/input-pages.service';
import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class UnderGroupsService {
  result: {};
  token: string;
  windowStorage: any;
  _url: string;
  paramCompanyName: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _inputFormService: InputFormService,
    public _globalVariableService: GlobalVaribles
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
    // console.log(this.windowStorage)
    this.paramCompanyName = this._inputFormService.paramCompanyName;
    // console.log(this.paramCompanyName)
  }

  createNewUnderGroup(user: any) {
    this._url = `${this._globalVariableService.baseServerUrl}/api/uglist?token=${this.token}&companyName=${
      this.paramCompanyName
    }`;
    return this.http.post(this._url, user).map((res: Response) => {
      this.result = res.json();
      // console.log(this.result)
    });
  }
}
