import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GlobalVaribles } from '../../../../shared/globalVariables/globalVariable';

import 'rxjs/add/operator/map';
import 'rxjs';
@Injectable()
export class JournalEntryService {
  token: string;
  windowStorage: any;
  _url: string;
  editContentId: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _globalVariableService: GlobalVaribles
  ) {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = this.windowStorage.token;
  }

  getIncomingData(selectionValue, companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/journalStored?token=${
      this.token
    }&&companyName=${companyName}&&selectionValue=${selectionValue}`;
    return this.http.get(this._url);
    // return 0;
  }

  getAllIncomingData(companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/alljournalStored?token=${this.token}&&companyName=${companyName}`;
    return this.http.get(this._url);
    // return 0;
  }

  deleteEntry(id, companyName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/deleteJournalEntry?token=${
      this.token
    }&&companyName=${companyName}&&deleteId=${id}`;
    return this.http.delete(this._url);
    // return 0;
  }
}
