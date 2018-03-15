import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './service/payment.service';
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  // Models
  contentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;
  public dropdFilter: string;

  // Modal for column hide and show

  VColPaymentType: String = 'Payment Type';
  VColPaymentThrough: String = 'Payment Through';
  VColChequeNO: String = 'Cheque Number';
  VColAgainst: String = 'Against';

  @Input() public ColPaymentType: Boolean = false;
  public ColPaymentThrough: Boolean = false;
  public ColChequeNO: Boolean = false;
  public ColAgainst: Boolean = false;

  form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public closeResult: string;

  dropdownList = [];
  selectedItems = [];
  chooseItem = ['Payment Type', 'Payment Through', 'Cheque Number', 'Against'];
  chooseItemBox = [];
  dropdownSettings = {};
  public accountType: Array<string> = ['All', 'Cash', 'Bank'];
  public incomingData: Array<string> = [];

  constructor(private route: ActivatedRoute, public _paymentService: PaymentService, public fb: FormBuilder) {}
  ngOnInit() {
    this.onAccSelect('All');
  }

  onAdd(item: any): void {
    // console.log(item)
    console.log(item === this.VColPaymentType);
    console.log(this.VColAgainst);
    switch (item) {
      case this.VColPaymentType:
        this.ColPaymentType = true;
        break;
      case this.VColPaymentThrough:
        this.ColPaymentThrough = true;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = true;
        break;
      case this.VColAgainst:
        this.ColAgainst = true;
        break;
    }
  }

  onAccSelect(item: any): void {
    // console.log(item)
    if (item === 'All') {
      this.getAllIncomingData();
    } else {
      this.getIncomingData(item);
    }
  }

  onRemove(item: any) {
    console.log(item);
    console.log(item === this.VColPaymentType);
    switch (item.label) {
      case this.VColPaymentType:
        this.ColPaymentType = false;
        break;
      case this.VColPaymentThrough:
        this.ColPaymentThrough = false;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = false;
        break;
      case this.VColAgainst:
        this.ColAgainst = false;
        break;
    }
  }
  onSelectAll(items: any) {
    // console.log(items);
    this.ColPaymentType = true;
    this.ColPaymentThrough = true;
    this.ColChequeNO = true;
    this.ColAgainst = true;
    this.chooseItemBox = ['Payment Type', 'Payment Through', 'Cheque Number', 'Against'];
  }
  onDeSelectAll(items: any) {
    // console.log(items);
    this.ColPaymentType = false;
    this.ColPaymentThrough = false;
    this.ColChequeNO = false;
    this.ColAgainst = false;
    this.chooseItemBox = [];
  }
  // real date picker active from here

  getIncomingData(selectionValue) {
    this.dataCopy = this._paymentService
      .getIncomingData(selectionValue)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data.paymentData);
        this.incomingData = data.paymentData;
        console.log(this.incomingData);
      });
  }

  getAllIncomingData() {
    this.dataCopy = this._paymentService
      .getAllIncomingData()
      .map(response => response.json())
      .subscribe(data => {
        console.log(data.paymentData);
        this.incomingData = data.paymentData;
        console.log(data.totalSum);
      });
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    this._paymentService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
