import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalVaribles } from './../../../../shared/globalVariables/globalVariable';
// './../../../../shared/'
import 'rxjs/add/operator/map';
import 'rxjs/'
@Injectable()

export class UpdatePasswordService {

    _URL = `${this._globalVariables.baseServerUrl}/auth/updatepassword`;

    constructor(private http: Http,
         public _globalVariables: GlobalVaribles
        ) {
    }

    createNewUser(user: any, token: string): Observable<any> {
        this._URL = `${this._globalVariables.baseServerUrl}/auth/updatepassword?token=${token}`;
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        return this.http.patch(this._URL, user)
            .map((res: Response) => res.json())
    }

}
