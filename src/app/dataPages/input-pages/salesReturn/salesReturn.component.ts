import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { SalesReturnService } from './service/salesReturn.service';
declare var $: any;

@Component({
  selector: 'app-sales-return',
  templateUrl: './salesReturn.component.html',
  styleUrls: ['./salesReturn.component.scss'],
})
export class SalesReturnComponent implements OnInit {
  form: FormGroup;
  selectedIndex = 1;
  public dataCopy: any;
  public dataCopy1: any;
  public dataCopy2: any;
  private prsrData: any;
  public paramId: string;
  public subTotal: number;
  public totalAmount: number;
  public selectedString: String;

  public ledgerList: Array<string> = [];
  public salesList: Array<string> = [];
  public prsrList: Array<string> = [];

  public items: Array<string> = ['Wrocław', 'Zagreb', 'Zaragoza', 'Łódź'];
  constructor(
    private route: ActivatedRoute,
    public _salesReturnService: SalesReturnService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getPrsrList();
    this.getLedgerUGNames();
    this.getSalesUGNames();
    this.form = this.fb.group({
      invoiceNumber: [''],
      vehicleNumber: [''],
      partyName: [''],
      salesLedgerName: [''],
      saleType: [''],
      transportationMode: [''],
      supplyPlace: [''],
      particularsData: this.fb.array([]),
      subParticularsData: this.fb.array([]),
      narration: [''],
      file: [''],
      date: [null, Validators.required],
      grandTotal: ['0'],
    });
    this.addParticular();
    this.addSubParticular();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
    });
  }
  public selectedprsr(value: any, indexValue): void {
    let unitsValue, gstRatevalue;
    this.prsrData.prsr.forEach(element => {
      if (element.prsrName === value.id) {
        unitsValue = element.units;
        gstRatevalue = element.gstRate;
      }
    });
    const particularsData = <FormArray>this.form.controls['particularsData'];
    const array = particularsData.at(indexValue);
    array.patchValue({
      units: unitsValue,
      gstRate: gstRatevalue,
    });
  }

  get formData() {
    return <FormArray>this.form.get('particularsData');
  }

  initParticular() {
    return this.fb.group({
      nameOfProduct: [''],
      qty: [''],
      units: [''],
      rate: [''],
      subAmount: [''],
      gstRate: [''],
      amount: [''],
    });
  }
  initSubParticular() {
    return this.fb.group({
      additionalService: [''],
      percent: [''],
    });
  }
  addParticular() {
    this.subSum();
    const control = <FormArray>this.form.controls['particularsData'];
    const addCtrl = this.initParticular();
    control.push(addCtrl);
  }
  addSubParticular() {
    this.subSum();
    const cont = <FormArray>this.form.controls['subParticularsData'];
    const addCtrl = this.initSubParticular();
    cont.push(addCtrl);
  }
  removeParticular(i: number) {
    this.subSum();
    const control = <FormArray>this.form.controls['particularsData'];
    control.removeAt(i);
  }
  removeSubParticular(i: number) {
    this.subSum();
    const cont = <FormArray>this.form.controls['subParticularsData'];
    cont.removeAt(i);
  }

  onSubmit(user) {
    user.particularsData.map(el => {
      if (el.subAmount === '') {
        el.subAmount = el.qty * el.rate;
        el.subAmount = el.subAmount.toString();
      }
      if (el.amount === '') {
        el.amount = el.qty * el.rate + el.qty * el.rate * el.gstRate;
        el.amount = el.amount.toString();
      }
    });
    console.log(user);
    this._salesReturnService.createNewEntry(user, this.paramId).subscribe(data => {});
  }

  getLedgerUGNames() {
    this.dataCopy = this._salesReturnService
      .getLedgerUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data);
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  getSalesUGNames() {
    this.dataCopy1 = this._salesReturnService
      .getSalesUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data)
        this.salesList = this.salesList.concat(data.salesLedgerList);
      });
  }

  getPrsrList() {
    this.dataCopy2 = this._salesReturnService
      .getprsrList(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.prsrData = data;
        // console.log(data.prsr)
        this.prsrList = data.prsr.map(item => item.prsrName);
      });
  }

  subSum() {
    const formControls = this.form.controls.particularsData['controls'];
    this.subTotal = 0;
    for (let i = 0; i < formControls.length; i++) {
      const qty = formControls[i].controls.qty.value;
      const rate = formControls[i].controls.rate.value;
      const gstRate = formControls[i].controls.gstRate.value;
      let subAmount = formControls[i].controls.subAmount.value;
      let amount = formControls[i].controls.amount.value;
      if (subAmount === '') {
        subAmount = qty * rate;
        subAmount = subAmount.toString();
      }
      if (amount === '') {
        amount = qty * rate + qty * rate * gstRate;
        amount = amount.toString();
      }
      if (!isNaN(amount) && amount !== '') {
        this.subTotal += parseFloat(amount);
      }
      // console.log(this.subAmount);
    }
  }
  totalSum() {
    this.form.patchValue({
      grandTotal: 0,
    });
    const formControls = this.form.controls.subParticularsData['controls'];
    this.totalAmount = 0;
    for (let i = 0; i < formControls.length; i++) {
      const percent = formControls[i].controls.percent.value;
      if (!isNaN(percent) && percent !== '') {
        this.totalAmount += parseFloat(percent);
      }
    }
    if (!isNaN(this.subTotal)) {
      this.totalAmount += this.subTotal;
    }
    // console.log(this.totalAmount);
    this.form.patchValue({
      grandTotal: this.totalAmount,
    });
  }
}