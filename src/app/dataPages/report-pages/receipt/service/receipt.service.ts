import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { OutputPagesService } from "./../../../service/outputPages.service";
import { GlobalVariableService } from "./../../../../../sharedService/globalVariables/globalVariable.service";

import 'rxjs/add/operator/map';
import 'rxjs/'
@Injectable()
export class ReceiptService {

    private paramCompanyName: string;
    result: {};
    token: string;
    windowStorage: any;
    _url: string;
    contentId: string;

    constructor(private http: Http,
         private router: Router, 
         private route: ActivatedRoute, 
         public _inputFormService: OutputPagesService,
        public _globalVariableService: GlobalVariableService
) {
        this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
        this.token = this.windowStorage.token;
        this.paramCompanyName = this._inputFormService.paramCompanyName;
        // console.log(this.paramCompanyName)
    }

    getIncomingData() {
        this._url = `${this._globalVariableService.baseServerUrl}/api/receiptStored?token=${this.token}&&companyName=${this.paramCompanyName}`;
        return this.http.get(this._url);
    }

}
