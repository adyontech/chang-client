import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { UserStateService } from './../../../sharedService/userDetails/user-state.service';
import { AuthService } from './../../../../shared/auth/auth.service';

import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs/'
@Injectable()

export class PassForgotService {
  result: any;
  loggedIn: Boolean;
  _URL = `${this._globalVariableService.baseServerUrl}/auth/forgotPassword`;



  constructor(private http: Http,
    private _userStateService: AuthService,
    public _globalVariableService: GlobalVaribles) {
  }


  validateUser(user: any) {
    return this.http.patch(this._URL, user)
      .map((res: Response) => {
        this.result = res.json();
        console.log(this.result);
        if (this.result.success) {
        }
        return user;
      });
  }
}

interface LoginUser {
  email: String,
  password: String
}
