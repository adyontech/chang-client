import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from './../../../utilities/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { StateVaribles } from './../../../shared/forms/States';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseService } from './service/purchase.service';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import { DateValidator } from './../../../shared/validators/dateValidator';
import { GlobalCompanyService } from './../../../shared/globalServices/oneCallvariables.servce';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  public closeResult: string;
  public form: FormGroup;
  public dataCopy: any;
  public modalRef: any;
  public dataCopy1: any;
  public dataCopy2: any;
  private prsrData: any;
  public paramId: string;
  public ownerId: string;
  public subTotal: number;
  public companyStateName: String;
  public totalAmount: number;
  public attachmentError: Boolean = false;
  public attachmentName: String = 'No File Choosen.';
  public value: any = {};

  public ledgerList: Array<string> = [];
  public purchaseList: Array<string> = [];
  public prsrList: Array<string> = [];

  public stateList: Array<string> = [];
  public additionalServiceList: Array<string> = [
    'Discount',
    'Freight',
    'Shipping Charge',
    'BY WATER',
  ];
  public transportationModeArray = ['Road', 'Train', 'Air', 'Water'];
  public purchaseTypeArray = [
    'Intra State',
    'Inter State',
    'Exports',
    'Deemed Exports',
    'Stock Transfer',
    'others',
  ];
  public breadcrumbs = [{ name: 'Purchase' }, { name: 'Dashboard', link: '/' }];

  constructor(
    public _purchaseService: PurchaseService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private modalService: NgbModal,
    public _stateVariables: StateVaribles,
    public _globalCompanyService: GlobalCompanyService,
    public _toastrService: ToastrService
  ) {
    this.stateList = this._stateVariables.stateListArray;
  }

  ngOnInit() {
    this.getRouteParam();
    this.getPrsrList();
    this.getLedgerUGNames();
    this.getGlobalCompanyData();
    this.getPurchaseUGNames();
    this.form = this.fb.group({
      invoiceNumber: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),
      vehicleNumber: new FormControl('', [
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),
      partyName: new FormControl('', [Validators.required]),
      purchaseLedgerName: new FormControl('', [Validators.required]),
      purchaseType: new FormControl('', [Validators.required]),
      supplyPlace: new FormControl('', [Validators.required]),
      transportationMode: [''],
      particularsData: this.fb.array([]),
      subParticularsData: this.fb.array([]),
      narration: [''],
      file: [''],
      date: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          DateValidator.datevalidator('2', '3'),
        ])
      ),
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

  open(content) {
    this.modalRef = this.modalService.open(content, { size: 'lg' });
    this.modalRef.result.then(
      result => {
        this.getLedgerUGNames();
        this.getPurchaseUGNames();
        this.getPrsrList();
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
  get formData2() {
    return <FormArray>this.form.get('subParticularsData');
  }

  initParticular() {
    return this.fb.group({
      nameOfProduct: [''],
      qty: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
      units: [''],
      rate: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
      subAmount: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
      gstRate: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
      amount: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
    });
  }
  initSubParticular() {
    return this.fb.group({
      additionalService: [null],
      percent: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
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

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.companyStateName = data.state;
      });
  }

  fillTypeOfPurchase(value) {
    if (value === this.companyStateName) {
      this.form.patchValue({
        purchaseType: 'Intra state',
      });
    } else if (value === 'Others') {
      this.form.patchValue({
        purchaseType: '',
      });
    } else {
      this.form.patchValue({
        purchaseType: 'Inter state',
      });
    }
  }

  onFileChange(event) {
    this.attachmentError = false;
    const reader = new FileReader();

    if (event.target.files[0].size < 200000) {
      if (event.target.files && event.target.files.length > 0) {
        this.form.get('attachment').setValue(event.target.files[0]);
        this.attachmentName = event.target.files[0].name;
      }
    } else {
      this.attachmentError = true;
      this.attachmentName = 'No File choosen';
    }
  }

  onSubmit(user) {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        user.particularsData.map(el => {
          let subAmt;
          if (el.subAmount === '') {
            subAmt = el.qty * el.rate;
            el.subAmount = (el.qty * el.rate).toString();
          }
          if (el.amount === '') {
            subAmt = el.qty * el.rate;
            el.amount = ((subAmt * el.gstRate) / 100 + subAmt)
              .toFixed(2)
              .toString();
          }
        });
        this._purchaseService
          .createNewEntry(user, this.paramId, this.ownerId)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
            } else {
              this._toastrService.typeError('Error', data.message);
            }
          });
      } else {
        return;
      }
    });
  }

  getLedgerUGNames() {
    this.dataCopy = this._purchaseService
      .getLedgerUGNames(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = [];
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  getPurchaseUGNames() {
    this.dataCopy1 = this._purchaseService
      .getPurchaseUGNames(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.purchaseList = [];
        this.purchaseList = this.purchaseList.concat(data.purchaseLedgerList);
      });
  }

  getPrsrList() {
    this.dataCopy2 = this._purchaseService
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
        const sub = qty * rate;
        amount = ((sub * gstRate) / 100 + sub).toFixed(2);
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
}
