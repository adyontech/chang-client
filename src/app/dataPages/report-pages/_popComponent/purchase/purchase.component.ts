import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as alertFunctions from './../../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { PopPurchaseService } from './service/purchase.service';
declare var $: any;
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
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
  public attachmentError: Boolean = false;

  public ledgerList: Array<string> = [];
  public purchaseList: Array<string> = [];
  public prsrList: Array<string> = [];

  public items: Array<string> = ['Wrocław', 'Zagreb', 'Zaragoza', 'Łódź'];

  public value: any = {};
  public _disabledV: String = '0';
  public disabled: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public _purchaseService: PurchaseService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getPrsrList();
    this.getLedgerUGNames();
    this.getPurchaseUGNames();
    this.form = this.fb.group({
      invoiceNumber: [''],
      vehicleNumber: [''],
      partyName: [''],
      purchaseLedgerName: [''],
      purchaseType: [''],
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

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
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

  public refreshValue(value: any): void {
    this.value = value;
  }
  get formData() {
    return <FormArray>this.form.get('particularsData');
  }
  get formData2() {
    return <FormArray>this.form.get('subParticularsData');
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

  onFileChange(event) {
    this.attachmentError = false;
    console.log(event.target.files[0].size);
    const reader = new FileReader();

    if (event.target.files[0].size < 400000) {
      if (event.target.files && event.target.files.length > 0) {
        this.form.get('file').setValue(event.target.files[0]);
      }
    } else {
      this.attachmentError = true;
    }
  }

  onSubmit(user) {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        user.particularsData.map(el => {
          if ((el.subAmountconst = '')) {
            el.subAmount = el.qty * el.rate;
            el.subAmount = el.subAmount.toString();
          }
          if ((el.amountconst = '')) {
            el.amount = el.qty * el.rate + el.qty * el.rate * el.gstRate;
            el.amount = el.amount.toString();
          }
        });
        console.log(user);
        this._purchaseService.createNewEntry(user, this.paramId).subscribe(data => {});
      }
    });
  }

  getLedgerUGNames() {
    this.dataCopy = this._purchaseService
      .getLedgerUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data);
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  getPurchaseUGNames() {
    this.dataCopy1 = this._purchaseService
      .getPurchaseUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data)
        this.purchaseList = this.purchaseList.concat(data.purchaseLedgerList);
      });
  }

  getPrsrList() {
    this.dataCopy2 = this._purchaseService
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
