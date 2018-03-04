import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { CashAtBankService } from './service/cashAtBank.service';

@Component({
  selector: 'app-cash-atabank',
  templateUrl: './cashAtBank.component.html',
  styleUrls: ['./cashAtBank.component.scss'],
})
export class CashAtBankComponent implements OnInit {
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

  constructor(private route: ActivatedRoute, public _cashAtBankService: CashAtBankService, public fb: FormBuilder) {}

  ngOnInit() {
    this.getRouteParam();
    this.getLedgerNameData();
  }

  //   hotkeys(event) {
  //     if (event.keyCode == 76 && event.ctrlKey) {
  //       this.modal.open();
  //     }
  //   }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      //   this._cashAtBankService.setParamId(this.paramId)
    });
  }

  getLedgerNameData() {
    this.dataCopy = this._cashAtBankService
      .getLedgerNameData(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);

        this.getIncomingData(this.ledgerList[0]);
      });
  }
  getIncomingData(value) {
    this.dataCopy = this._cashAtBankService
      .getIncomingData(value, this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data);
        this.caseThrough(data.formData);
      });
  }

  caseThrough(arg) {
    // console.log(arg);
    this.debSum = 0;
    this.credSum = 0;
    // console.log(arg);
    arg.map(el => {
      switch (el.source.toLowerCase()) {
        case 'payment': {
          //   console.log(el.data)
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
        case 'journal': {
          console.log(el);
          for (let i = 0; i < el.data.particularsData.length; i++) {
            const check = this.ledgerList.includes(el.data.particularsData[i].particulars[0].id);
            if (!check) {
              let v1 = el.data.particularsData[i].debitAmount;
              let v2 = el.data.particularsData[i].creditAmount;
              v2 = [v1, (v1 = v2)][0];
            }
          }
          el.data = el.data.particularsData;
          break;
        }
      }
    });

    // console.log(arg);
    this.sumTotal = Math.abs(this.debSum - this.credSum);
    // this.incomingData = arg.map(el => el.data)[0];
    // console.log(arg.map(el => el.data));
    this.incomingData = [];
    arg.map(el => (this.incomingData = this.incomingData.concat(el.data)));
    console.log(this.incomingData);
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    // this._cashAtBankService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
