import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './service/payment.service';
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public form: FormGroup;
  public selectedIndex = 1;
  public dataCopy: any;
  public paramId: string;
  public totalAmount: number;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public _paymentService: PaymentService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getAccountNames();
    this.getLedgerUGNames();
    this.form = this.fb.group({
      paymentNumber: [''],
      date: [''],
      account: [''],
      paymentType: [''],
      paymentThrough: [''],
      chequeNumber: [''],
      drawnOn: [null, Validators.required],
      particularsData: this.fb.array([]),
      narration: [''],
      against: [''],
      file: [''],
      endtotal: [''],
    });
    this.addParticular();
  }

  initParticular() {
    return this.fb.group({
      particulars: ['', Validators.required],
      amount: [''],
    });
  }
  addParticular() {
    this.totalSum();
    const control = <FormArray>this.form.controls['particularsData'];
    const addCtrl = this.initParticular();
    control.push(addCtrl);
  }
  removeParticular(i: number) {
    const control = <FormArray>this.form.controls['particularsData'];
    control.removeAt(i);
    this.totalSum();
  }
  get formData() {
    return <FormArray>this.form.get('particularsData');
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
    });
  }

  totalSum() {
    const formControls = this.form.controls.particularsData['controls'];
    this.totalAmount = 0;
    for (let i = 0; i < formControls.length; i++) {
      const amount = formControls[i].controls.amount.value;
      if (!isNaN(amount) && amount !== '') {
        this.totalAmount += parseFloat(amount);
      }
      // console.log(this.totalAmount);
    }
  }

  getLedgerUGNames() {
    this.dataCopy = this._paymentService
      .getLedgerUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }
  getAccountNames() {
    this.dataCopy = this._paymentService
      .getAccountNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.accountList = this.accountList.concat(data.accountNameList);
      });
  }

  setSelected(id: number) {
    this.selectedIndex = id;
  }

  onSubmit(user) {
    user.endtotal = this.totalAmount;
    console.log(user);
    this._paymentService.createNewEntry(user, this.paramId).subscribe(data => {});
  }
}
