import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './../../../../shared/auth/auth.service';
import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class LoginService {
  result: any;
  loggedIn: Boolean;
  token: string;
  _URL = `${this._globalVariableService.baseServerUrl}/auth/login`;

  constructor(
    private http: Http,
    private _userStateService: AuthService,
    public _globalVariableService: GlobalVaribles,
    private router: Router
  ) {}

  checkToken() {
    const windowStorages = JSON.parse(window.localStorage.getItem('user'));
    if (windowStorages === null || windowStorages === undefined) {
      // redirection code;
    } else {
      this.router.navigate(['/gateway']);
    }
  }

  validateUser(user: any) {
    return this.http.post(this._URL, user).map((res: Response) => {
      this.result = res.json();
      console.log(this.result);
      if (this.result.success) {
        this.setGlobal(this.result);
        console.log(this._userStateService);
        this.router.navigate(['/gateway']);
      }
      return user;
    });
  }

  setGlobal(data) {
    this._userStateService.dummySetter();
    this._userStateService.setUserData(data.user, data.token);
  }

  logOut() {
    // remove user from local storage to log user out
    window.localStorage.removeItem('user');
  }
}

interface LoginUser {
  email: String;
  password: String;
}
