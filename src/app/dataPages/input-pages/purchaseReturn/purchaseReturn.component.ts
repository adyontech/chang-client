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
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import { DateValidator } from './../../../shared/validators/dateValidator';
import { GlobalCompanyService } from './../../../shared/globalServices/oneCallvariables.servce';
import { PurchaseReturnService } from './service/purchaseReturn.service';

@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchaseReturn.component.html',
  styleUrls: ['./purchaseReturn.component.scss'],
})
export class PurchaseReturnComponent implements OnInit {
  public closeResult: string;
  public form: FormGroup;
  public dataCopy: any;
  public modalRef: any;
  public dataCopy1: any;
  public dataCopy2: any;
  private prsrData: any;
  public paramId: string;
  public ownerId: string;
  public minNgbDate;
  public maxNgbDate;
  public subTotal: number;
  public companyStateName: String;
  public totalAmount: number;
  public attachmentError: Boolean = false;
  public attachmentName: String = 'No File Choosen.';
  public value: any = {};

  public ledgerList: Array<string> = [];
  public purchaseList: Array<string> = [];
  public prsrList: Array<string> = [];
  public originalInvoiceArray: Array<string> = [];
  public originalInvoiceObj: any;
  public stateList: Array<string> = [];
  public transportationModeArray = ['Road', 'Train', 'Air', 'Water'];
  public breadcrumbs = [
    { name: 'Purchase Return' },
    { name: 'Dashboard', link: '/' },
  ];
  public additionalServiceList: Array<string> = [
    'Discount',
    'Freight',
    'Shipping Charge',
    'BY WATER',
  ];
  public addSubArray = ['Add(+)', 'Sub(-)'];
  public purchaseTypeArray = [
    'Intra State',
    'Inter State',
    'Exports',
    'Deemed Exports',
    'Stock Transfer',
    'others',
  ];

  constructor(
    public _purchaseService: PurchaseReturnService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public _stateVariables: StateVaribles,
    private modalService: NgbModal,
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
    this.getIvoiceNumbers();
    this.getPurchaseUGNames();
    this.form = this.fb.group({
      creditInvoiceNumber: [''],
      originalInvoiceNumber: new FormControl('', [Validators.required]),
      date: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
      ),
      originalInvoiceDate: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
      ),
      partyName: new FormControl('', [Validators.required]),
      purchaseLedgerName: new FormControl('', [Validators.required]),
      purchaseType: new FormControl('', [Validators.required]),
      supplyPlace: [''],
      particularsData: this.fb.array([]),
      subParticularsData: this.fb.array([]),
      narration: [''],
      attachment: [''],
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
      additionalService: [''],
      percent: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
      addSub: ['Add(+)'],
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

  dateRangeValidator(arg) {
    let dateError;
    const dateVal = this.form.get(arg).value;
    if (typeof dateVal === 'object') {
      dateError = this._globalCompanyService.dateRangeValidator(
        dateVal,
        this.minNgbDate,
        this.maxNgbDate
      );
    }
    console.log(dateError);
    if (dateError) {
      this.form.controls[arg].setErrors({ dateIncorrect: true });
    }
  }

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        const minD = new Date(parseInt(data.startDate, 0));
        this.minNgbDate = {
          year: minD.getFullYear(),
          month: minD.getMonth(),
          day: minD.getDate(),
        };
        const maxD = new Date(parseInt(data.endDate, 0));
        this.maxNgbDate = {
          year: maxD.getFullYear(),
          month: maxD.getMonth(),
          day: maxD.getDate(),
        };
        this.companyStateName = data.state;
      });
  }

  getIvoiceNumbers() {
    this.dataCopy = this._purchaseService
      .getIvoiceNumbers(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        if (data.success === true) {
          console.log(data);
          this.originalInvoiceObj = data.purchase;
          this.originalInvoiceArray = this.originalInvoiceObj.map(
            el => el.invoiceNumber
          );
        }
      });
  }

  updateFromOriginalInvoice(value) {
    this.originalInvoiceObj.map(el => {
      if (el.invoiceNumber === value) {
        this._purchaseService
          .getPurchaseInvoiceDataById(el._id, this.paramId, this.ownerId)
          .map(response => response.json())
          .subscribe(data => {
            console.log(data.purchase);
            const originalDate = new Date(parseInt(data.purchase.date, 0));
            this.form.controls['originalInvoiceDate'].setValue({
              year: originalDate.getFullYear(),
              month: originalDate.getMonth(),
              day: originalDate.getDate(),
            });
            this.form.controls['partyName'].setValue(data.purchase.partyName);

            this.form.controls['purchaseLedgerName'].setValue(
              data.purchase.purchaseLedgerName
            );

            this.form.controls['supplyPlace'].setValue(
              data.purchase.supplyPlace
            );
            this.form.controls['purchaseType'].setValue(
              data.purchase.purchaseType
            );
          });
      }
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

  onSubmit(user) {
    user.date = new Date(
      user.date.year,
      user.date.month,
      user.date.day
    ).getTime();
    user.originalInvoiceDate = new Date(
      user.originalInvoiceDate.year,
      user.originalInvoiceDate.month,
      user.originalInvoiceDate.day
    ).getTime();
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
      user.date = new Date(user.date);
      this.form.controls['date'].setValue({
        year: user.date.getFullYear(),
        month: user.date.getMonth(),
        day: user.date.getDate(),
      });
      user.originalInvoiceDate = new Date(user.originalInvoiceDate);
      this.form.controls['originalInvoiceDate'].setValue({
        year: user.originalInvoiceDate.getFullYear(),
        month: user.originalInvoiceDate.getMonth(),
        day: user.originalInvoiceDate.getDate(),
      });
    });
  }

  getLedgerUGNames() {
    this.dataCopy = this._purchaseService
      .getLedgerUGNames(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  getPurchaseUGNames() {
    this.dataCopy1 = this._purchaseService
      .getPurchaseUGNames(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
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
        subAmount = (qty * rate).toString();
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

  totalSumBySwitch(value) {
    console.log(value);
    this.totalSum();
  }
  totalSum() {
    this.form.patchValue({
      grandTotal: 0,
    });
    const formControls = this.form.controls.subParticularsData['controls'];
    this.totalAmount = 0;
    for (let i = 0; i < formControls.length; i++) {
      const percent = formControls[i].controls.percent.value;
      const addSub = formControls[i].controls.addSub.value;
      if (!isNaN(percent) && percent !== '') {
        if (addSub === 'Add(+)') {
          this.totalAmount += parseFloat(percent);
        } else if (addSub === 'Sub(-)') {
          this.totalAmount -= parseFloat(percent);
        }
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
