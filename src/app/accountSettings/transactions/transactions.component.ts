import { Component, HostListener, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TransactionsService } from './service/transactions.service';
declare var $: any;
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  // // public form: FormGroup;
  // public profileUpdated;
  // public user: any;
  // public packName: string;
  public transData;
  public transDataLength;
  public validTIll;
  constructor(public _transactionsService: TransactionsService) {}

  ngOnInit() {
    this.requestPaymentDetails();
  }

  requestPaymentDetails() {
    this._transactionsService.requestPaymentDetails().subscribe(data => {
      this.transData = data.json().transactions;
      this.transDataLength = this.transData.length;
      // this.transData.map(el => {
      //   const year = el.paymenetSuccessDate.getFullYear();
      //   const month = el.paymenetSuccessDate.getMonth();
      //   const day = el.paymenetSuccessDate.getDate();
      //   el.paymenetSuccessDate = new Date(year + 1, month, day);
      // });
    });
  }
}
