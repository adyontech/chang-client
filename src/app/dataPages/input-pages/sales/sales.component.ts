import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from '../../../utilities/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { StateVaribles } from '../../../shared/forms/States';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from './service/sales.service';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { patternValidator } from '../../../shared/validators/pattern-validator';
import { DateValidator } from '../../../shared/validators/dateValidator';
import { GlobalCompanyService } from '../../../shared/globalServices/oneCallvariables.servce';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
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

  public minNgbDate;
  public maxNgbDate;
  public companyStateName: String;
  public totalAmount: number;
  public attachmentError: Boolean = false;
  public attachmentName: String = 'No File Choosen.';
  public value: any = {};

  public ledgerList: Array<string> = [];
  public salesList: Array<string> = [];
  public prsrList: Array<string> = [];

  public stateList: Array<string> = [];
  public additionalServiceList: Array<string> = [
    'Discount',
    'Freight',
    'Shipping Charge',
    'BY WATER',
  ];
  public addSubArray = ['Add(+)', 'Sub(-)'];
  public transportationModeArray = ['Road', 'Train', 'Air', 'Water'];
  public salesType = [
    'Intra State',
    'Inter State',
    'Exports',
    'Deemed Exports',
    'Stock Transfer',
    'others',
  ];
  public breadcrumbs = [{ name: 'Sales' }, { name: 'Dashboard', link: '/' }];

  constructor(
    private route: ActivatedRoute,
    public _salesService: SalesService,
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
    this.getSalesUGNames();
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
      salesLedgerName: new FormControl('', [Validators.required]),
      saleType: new FormControl('', [Validators.required]),
      supplyPlace: new FormControl('', [Validators.required]),
      transportationMode: [''],
      particularsData: this.fb.array([]),
      subParticularsData: this.fb.array([]),
      narration: [''],
      attachment: [''],
      date: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
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
        this.getSalesUGNames();
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

  public selectedprsr(value: any, indexValue): void {
    let unitsValue, gstRatevalue;
    this.prsrData.prsr.forEach(element => {
      if (element.prsrName === value) {
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
      addSub: ['Add(+)'],
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

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        const minD = new Date(parseInt(data.startDate, 0));
        this.minNgbDate = {
          year: minD.getFullYear(),
          month: minD.getMonth() + 1,
          day: minD.getDate(),
        };
        const maxD = new Date(parseInt(data.endDate, 0));
        this.maxNgbDate = {
          year: maxD.getFullYear(),
          month: maxD.getMonth() + 1,
          day: maxD.getDate(),
        };
        this.companyStateName = data.state;
      });
  }
  fillTypeOfSales(value) {
    if (value === this.companyStateName) {
      this.form.patchValue({
        saleType: 'Intra state',
      });
    } else if (value === 'Others') {
      this.form.patchValue({
        saleType: '',
      });
    } else {
      this.form.patchValue({
        saleType: 'Inter state',
      });
    }
  }

  getLedgerUGNames() {
    this.dataCopy = this._salesService
      .getLedgerUGNames(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = [];
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  getSalesUGNames() {
    this.dataCopy1 = this._salesService
      .getSalesUGNames(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.salesList = [];
        this.salesList = this.salesList.concat(data.salesLedgerList);
      });
  }

  getPrsrList() {
    this.dataCopy2 = this._salesService
      .getprsrList(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.prsrData = [];
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
    console.log(user);
    user.date = new Date(
      user.date.year,
      user.date.month - 1,
      user.date.day
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
        this._salesService
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
        month: user.date.getMonth() + 1,
        day: user.date.getDate(),
      });
    });
  }
  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
}
