import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { TrialBalanceService } from './service/trialBalance.service';
import { log } from 'util';

declare var $: any;

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trialBalance.component.html',
  styleUrls: ['./trialBalance.component.scss'],
})
export class TrialBalanceComponent implements OnInit {
  contentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;


  incomingData: Array<string>;
  form: FormGroup;
  debSum: Number;
  credSum: Number;
  public dataCopy: any;
  public paramId: string;
  public closeResult: string;

  constructor(
    private route: ActivatedRoute,
    public _trialBalanceService: TrialBalanceService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getIncomingData();

  }

  onClose() {
    console.log('Modal Closed');
    this.contentId = '';
  }
  getIncomingData() {
    this.debSum = 0;
    this.credSum = 0;
    this.dataCopy = this._trialBalanceService
      .getIncomingData()
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.formData;

        data.formData.map(el => {
          this.debSum += el.debitAmount;
          this.credSum += el.creditAmount;
        });
      });
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    this._trialBalanceService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
