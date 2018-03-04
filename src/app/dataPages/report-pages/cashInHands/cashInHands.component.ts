import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { CashInHandsService } from './service/cashInHands.service';

declare var $: any;

@Component({
  selector: 'app-cash-in-hands',
  templateUrl: './cashInHands.component.html',
  styleUrls: ['./cashInHands.component.scss'],
})
export class CashInHandsComponent implements OnInit {
  contentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;

  debSum: number;
  credSum: number;
  sumTotal: number;
  incomingData: Array<string>;
  form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public closeResult: string;
  public ledgerList: Array<string> = [];

  constructor(private route: ActivatedRoute, public _cashInHandsService: CashInHandsService, public fb: FormBuilder) {}

  ngOnInit() {
    this.getRouteParam();
    this.getLedgerNameData();
  }

  // hotkeys(event) {
  //   if (event.keyCode == 76 && event.ctrlKey) {
  //     this.modal.open();
  //   }
  // }
  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      //   this._cashAtBankService.setParamId(this.paramId)
    });
  }
  getLedgerNameData() {
    this.dataCopy = this._cashInHandsService
      .getLedgerNameData(this.paramId )
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);

        this.getIncomingData(this.ledgerList[0]);
      });
  }
  getIncomingData(value) {
    this.dataCopy = this._cashInHandsService
      .getIncomingData(value, this.paramId )
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data);
        this.caseThrough(data.formData);
      });
  }

  caseThrough(arg) {
    this.debSum = 0;
    this.credSum = 0;
    // console.log(arg);
    arg.map(el => {
      switch (el.source.toLowerCase()) {
        case 'payment': {
          el.data.map(elm =>
            elm.particularsData.map(ele => {
              if (elm.account.toLowerCase() === 'cash') {
                ele['creditAmount'] = ele.amount;
                this.credSum += ele.amount;
                ele['debitAmount'] = 0;
              } else {
                ele['debitAmount'] = ele.amount;
                this.debSum += ele.amount;
                ele['creditAmount'] = 0;
              }
            })
          );
          break;
        }
        case 'receipt': {
          el.data.map(elm =>
            elm.particularsData.map(ele => {
              if (elm.account.toLowerCase() === 'cash') {
                ele['debitAmount'] = ele.amount;
                this.debSum += ele.amount;
                ele['creditAmount'] = 0;
              } else {
                ele['creditAmount'] = ele.amount;
                this.credSum += ele.amount;
                ele['debitAmount'] = 0;
              }
            })
          );
          break;
        }
        case 'conta': {
          el.data.map(elm =>
            elm.particularsData.map(ele => {
              if (elm.account.toLowerCase() === 'cash') {
                ele['debitAmount'] = ele.amount;
                this.debSum += ele.amount;
                ele['creditAmount'] = 0;
              } else {
                ele['creditAmount'] = ele.amount;
                this.credSum += ele.amount;
                ele['debitAmount'] = 0;
              }
            })
          );
          break;
        }
      }
    });

    console.log(arg);
    this.sumTotal = Math.abs(this.debSum - this.credSum);
    this.incomingData = arg.map(el => el.data)[0];
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    this._cashInHandsService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}