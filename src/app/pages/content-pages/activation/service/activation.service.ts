import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';
import 'rxjs/add/operator/map';
import 'rxjs/';
@Injectable()
export class ActivationService {
  constructor(private http: Http, public _globalVariableService: GlobalVaribles) {}

  authentication(token: any): Observable<any> {
    console.log(token);

    const _URL = `${this._globalVariableService.baseServerUrl}/auth/activation?token=${token}`;
    return this.http.patch(_URL, token).map((res: Response) => res.json());
  }
}
