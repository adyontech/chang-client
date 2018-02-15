import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';
// './../../../../shared/'
import 'rxjs/add/operator/map';
import 'rxjs/'
@Injectable()

export class SignupService {

    _URL = `${this._globalVariables.baseServerUrl}/auth/register`;

    constructor(private http: Http,
         public _globalVariables: GlobalVaribles
        ) {
    }

    createNewUser(user: any): Observable<any> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this._URL, user)
            .map((res: Response) => res.json())
    }

}
