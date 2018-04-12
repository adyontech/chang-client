import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { UserStateService } from './../../../sharedService/userDetails/user-state.service';
import { AuthService } from './../../../../shared/auth/auth.service';

import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class PassForgotService {
  result: any;
  loggedIn: Boolean;
  _URL = `${this._globalVariableService.baseServerUrl}/auth/forgotPassword`;

  constructor(
    private http: Http,
    private _userStateService: AuthService,
    public _globalVariableService: GlobalVaribles,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  validateUser(user: any) {
    return this.http.patch(this._URL, user).map((res: Response) => {
      return res.json();
    });
  }
}

interface LoginUser {
  email: String;
  password: String;
}
