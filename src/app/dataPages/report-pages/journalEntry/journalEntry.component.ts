import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { JournalEntryService } from './service/journalEntry.service';

declare var $: any;

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journalEntry.component.html',
  styleUrls: ['./journalEntry.component.scss'],
})
export class JournalEntryComponent implements OnInit {
  contentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;


  incomingData: Array<string>;
  form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public closeResult: string;

  constructor(
    private route: ActivatedRoute,
    public _journalEntryService: JournalEntryService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getIncomingData();

  }

//   hotkeys(event) {
//     if (event.keyCode == 76 && event.ctrlKey) {
//       this.modal.open();
//     }
//   }

  getIncomingData() {
    this.dataCopy = this._journalEntryService
      .getIncomingData()
      .map(response => response.json())
      .subscribe(data => {
        console.log(data.journalData);
        this.incomingData = data.journalData;
      });
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    this._journalEntryService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
