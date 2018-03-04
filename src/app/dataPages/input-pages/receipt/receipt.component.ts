import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from './service/receipt.service';

declare var $: any;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  form: FormGroup;
  selectedIndex = 1;
  public dataCopy: any;
  paramId: string;
  totalAmount: number;

  public ledgerList: Array<string> = [];
  public accountList: Array<string> = ['Cash'];

  public value: any = {};
  public _disabledV: String = '0';
  public disabled: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    public _receiptService: ReceiptService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    $.getScript('./assets/js/jquery.steps.min.js');
    $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getAccountNames();
    this.getLedgerNames();
    this.form = this.fb.group({
      receiptNumber: [''],
      date: [''],
      account: [''],
      receiptType: [''],
      receiptThrough: [''],
      chequeNumber: [''],
      drawnOn: [null, Validators.required],
      against: [''],
      particularsData: this.fb.array([]),
      narration: [''],
      file: [''],
    });
    this.addParticular();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
    });
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
    this.totalSum();
    const control = <FormArray>this.form.controls['particularsData'];
    control.removeAt(i);
  }

  get formData() {
    return <FormArray>this.form.get('particularsData');
  }

  totalSum() {
    const formControls = this.form.controls.particularsData['controls'];
    this.totalAmount = 0;
    for (let i = 0; i < formControls.length; i++) {
      const amount = formControls[i].controls.amount.value;
      if (!isNaN(amount) && amount !== '') {
        this.totalAmount += parseFloat(amount);
      }
    }
  }

  getLedgerNames() {
    this.dataCopy = this._receiptService
      .getLedgerNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }
  getAccountNames() {
    this.dataCopy = this._receiptService
      .getAccountNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.accountList = this.accountList.concat(data.accountNameList);
      });
  }

  onSubmit(user) {
    console.log(user);
    this._receiptService.createNewEntry(user, this.paramId).subscribe(data => {});
  }
}
