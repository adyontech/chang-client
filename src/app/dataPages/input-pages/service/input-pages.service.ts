import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

// import { UserStateService } from './../../../sharedService/userDetails/user-state.service';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class InputFormService {
  windowStorage: any;
  token: string;
  paramCompanyName;
  id: any;
  constructor(
    private http: Http,
    private router: Router,
    private _activatedRoute: ActivatedRoute // public _userStateService: UserStateService
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
    console.log(this.windowStorage.token)
  }

}
