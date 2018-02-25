import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './../../../../shared/auth/auth.service';
import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class SignupService {
  result: any;
  loggedIn: Boolean;
  token: string;
  _URL = `${this._globalVariableService.baseServerUrl}/auth/register`;

  constructor(
    private http: Http,
    private _userStateService: AuthService,
    public _globalVariableService: GlobalVaribles,
    private router: Router
  ) {}

  createNewUser(user: any) {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(this._URL, user).map((res: Response) => res.json());
  }
  checkToken() {
    const windowStorages = JSON.parse(window.localStorage.getItem('user'));
    console.log(windowStorages)
    if (windowStorages === null || windowStorages === undefined) {
      // redirection code;
    } else {
      this.router.navigate(['/gateway']);
    }
  }
  logOut() {
    // remove user from local storage to log user out
    window.localStorage.removeItem('user');
  }
}
