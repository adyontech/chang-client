import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { PopSalesService } from './service/sales.service';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';

declare var $: any;

@Component({
  selector: 'app-pop-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class PopSalesComponent implements OnInit {
  @Input() editContentId: string;
  editupdate: Boolean = false;
  popContnetId = '';
  closeResult: string;
  form: FormGroup;
  public dataCopy: any;
  public dataCopy1: any;
  public dataCopy2: any;
  private prsrData: any;
  public paramId: string;
  public ownerId: string;
  public subTotal: number;
  public totalAmount: number;
  public attachmentError: Boolean = false;

  public ledgerList: Array<string> = [];
  public salesList: Array<string> = [];
  public prsrList: Array<string> = [];

  public items: Array<string> = ['Wrocław', 'Zagreb', 'Zaragoza', 'Łódź'];
  public transportationModeArray = ['road', 'train', 'air', 'water'];
  public salesType = [
    'intrastate',
    'interstate',
    'outsidecountry',
    'deemedexports',
    'withinstate',
    'outsidestate',
    'others',
  ];
  public value: any = {};
  public _disabledV: String = '0';
  public disabled: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public _salesService: PopSalesService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getPrsrList();
    this.getIncomingData();
    this.getLedgerUGNames();
    this.getSalesUGNames();
    this.form = this.fb.group({
      date: [null, Validators.required],
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
      grandTotal: ['0'],
    });
    this.addParticular();
    this.addSubParticular();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id;
      this.ownerId = params.owner;
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

  getIncomingData() {
    if (this.editContentId !== this.popContnetId) {
      this.popContnetId = this.editContentId;
      if (this.popContnetId !== '') {
        this._salesService
          .getSalesFormData(this.paramId, this.popContnetId, this.ownerId)
          .map(response => response.json())
          .subscribe(data => {
            this.fillForm(data.salesData);
          });
      }
    }
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

  get formData() {
    return <FormArray>this.form.get('particularsData');
  }

  get formData2() {
    return <FormArray>this.form.get('subParticularsData');
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

  getLedgerUGNames() {
    this.dataCopy = this._salesService
      .getLedgerUGNames(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  getSalesUGNames() {
    this.dataCopy1 = this._salesService
      .getSalesUGNames(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.salesList = this.salesList.concat(data.salesLedgerList);
      });
  }

  getPrsrList() {
    this.dataCopy2 = this._salesService
      .getprsrList(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.prsrData = data;
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
    this.form.patchValue({
      grandTotal: this.totalAmount,
    });
  }

  onFileChange(event) {
    this.attachmentError = false;
    const reader = new FileReader();

    if (event.target.files[0].size < 400000) {
      if (event.target.files && event.target.files.length > 0) {
        this.form.get('file').setValue(event.target.files[0]);
      }
    } else {
      this.attachmentError = true;
    }
  }

  fillForm(data) {
    data = data[0];
    data.date = new Date(data.date);
    this.form.controls['date'].setValue({
      year: data.date.getFullYear(),
      month: data.date.getMonth(),
      day: data.date.getDate(),
    });
    this.form.controls['invoiceNumber'].setValue(data.invoiceNumber);
    this.form.controls['vehicleNumber'].setValue(data.vehicleNumber);
    this.form.controls['partyName'].setValue(data.partyName);
    this.form.controls['salesLedgerName'].setValue(data.salesLedgerName);
    this.form.controls['saleType'].setValue(data.saleType);
    this.form.controls['transportationMode'].setValue(data.transportationMode);
    this.form.controls['supplyPlace'].setValue(data.supplyPlace);
    this.form.controls['transportationMode'].setValue(data.transportationMode);
    this.form.controls['narration'].setValue(data.narration);

    const particularsData = <FormArray>this.form.controls['particularsData'];
    const oldArray = data.particularsData;
    oldArray.forEach((element, index) => {
      const array = particularsData.at(index);
      if (!array) {
        particularsData.push(
          this.fb.group({
            nameOfProduct: [element.nameOfProduct],
            qty: element.qty,
            units: element.units,
            rate: element.rate,
            subAmount: element.subAmount,
            gstRate: element.gstRate,
            amount: element.amount,
          })
        );
      } else {
        array.patchValue({
          nameOfProduct: element.nameOfProduct,
          qty: element.qty,
          units: element.units,
          rate: element.rate,
          subAmount: element.subAmount,
          gstRate: element.gstRate,
          amount: element.amount,
        });
      }
    });
  }

  onSubmit(user, action) {
    // alertFunctions.SaveData().then(datsa => {
    //   if (datsa) {
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
    if (action === false) {
      this._salesService.editEntry(user, this.paramId, this.editContentId, this.ownerId).subscribe(data => {});
    } else {
      this._salesService.createNewEntry(user, this.paramId, this.ownerId).subscribe(data => {});
    }
    //   }
    // })
  }
}
