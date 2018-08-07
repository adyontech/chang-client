import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PopPaymentService } from './service/popPayment.service';
import { ToastrService } from '../../../../utilities/toastr.service';
import { GlobalCompanyService } from '../../../../shared/globalServices/oneCallvariables.servce';
import { patternValidator } from '../../../../shared/validators/pattern-validator';
import { DateValidator } from '../../../../shared/validators/dateValidator';

declare var $: any;

@Component({
  selector: 'app-pop-payment',
  templateUrl: './popPayment.component.html',
  styleUrls: ['./popPayment.component.scss'],
})
export class PopPaymentComponent implements OnInit {
  @Input() editContentId: string;
  // popContentId will be empty string checking only
  editupdate: Boolean = false;
  popContnetId = '';
  closeResult: string;
  public form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public totalAmount: number;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = [];
  public attachmentError: Boolean = false;

  public modalRef: any;
  public ownerName: string;
  public particularList: Array<string> = [];
  public attachmentName: String = 'No File Choosen.';
  public showCheque = false;
  public showAgainst = true;
  public minNgbDate;
  public maxNgbDate;
  public showInvoiceNumberField = false;
  public allInvoiceNumberArray: Array<string> = [];
  public paymentTypeArray: Array<string> = [
    'General',
    'Purchase payment',
    'Sales refund',
    'Credit Note',
    'Others',
  ];
  public paymentThroughArray: Array<string> = [
    'Cash',
    'Cheque',
    'E transfer',
    'Others',
  ];
  public againstArray: Array<string> = [
    'Against invoice',
    'Against account',
    'Against advance',
  ];

  public value: any = {};

  constructor(
    private route: ActivatedRoute,
    public _popPaymentService: PopPaymentService,
    public fb: FormBuilder,
    private router: Router,
    public _toastrService: ToastrService,
    public _globalCompanyService: GlobalCompanyService
  ) {}

  ngOnInit() {
    $.getScript('./assets/js/jquery.steps.min.js');
    $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getIncomingData();
    this.getParticularNames();
    this.getAccountNames();
    this.getGlobalCompanyData();
    this.getLedgerNames();
    this.form = this.fb.group({
      paymentNumber: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),
      date: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
      ),
      account: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      paymentThrough: new FormControl('', [Validators.required]),
      chequeNumber: [''],
      againstInvoiceNumber: [''],
      drawnOn: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
      ),
      particularsData: this.fb.array([]),
      narration: [''],
      against: new FormControl('', [Validators.required]),
      attachment: [''],
      endtotal: [''],
    });
    this.addParticular();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  addParticular() {
    this.totalSum();
    const control = <FormArray>this.form.controls['particularsData'];
    const addCtrl = this.initParticular();
    control.push(addCtrl);
  }

  fillForm(data) {
    data = data[0];
    data.date = new Date(parseInt(data.date, 0));
    data.drawnOn = new Date(parseInt(data.drawnOn, 0));
    const now = new Date();
    this.form.controls['account'].setValue(data.account);
    this.form.controls['chequeNumber'].setValue(data.chequeNumber);
    this.form.controls['against'].setValue(data.against);
    this.form.controls['date'].setValue({
      year: data.date.getFullYear(),
      month: data.date.getMonth() + 1,
      day: data.date.getDate(),
    });
    this.form.controls['drawnOn'].setValue({
      year: data.drawnOn.getFullYear(),
      month: data.drawnOn.getMonth() + 1,
      day: data.drawnOn.getDate(),
    });
    this.form.controls['narration'].setValue(data.narration);
    this.form.controls['paymentNumber'].setValue(data.paymentNumber);
    this.form.controls['paymentType'].setValue(data.paymentType);
    this.form.controls['paymentThrough'].setValue(data.paymentThrough);

    const particularsData = <FormArray>this.form.controls['particularsData'];
    const oldArray = data.particularsData;
    oldArray.forEach((element, index) => {
      const array = particularsData.at(index);
      if (!array) {
        particularsData.push(
          this.fb.group({
            particulars: [element.particulars],
            amount: element.amount,
          })
        );
      } else {
        array.patchValue({
          particulars: element.particulars,
          amount: element.amount,
        });
      }
    });
  }

  get formData() {
    return <FormArray>this.form.get('particularsData');
  }

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerName)
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
      });
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

  setAgainst(value) {
    this.showInvoiceNumberField = false;
    if (
      value === 'General' ||
      value === 'Purchase refund' ||
      value === 'Others'
    ) {
      this.showAgainst = false;
    } else {
      this.showAgainst = true;
      this.form.patchValue({
        against: '',
      });
    }
  }

  SetDrawnOn(value) {
    if (value !== null) {
      const dateval = new Date(value.year, value.month, value.day);
      this.form.controls['drawnOn'].setValue({
        year: dateval.getFullYear(),
        month: dateval.getMonth(),
        day: dateval.getDate(),
      });
    }
  }
  getAccountNames() {
    this.dataCopy = this._popPaymentService
      .getAccountNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.accountList = this.accountList.concat(data.accountNameList);
      });
  }
  showInvoiceNumber(value) {
    if (value === 'Against invoice') {
      this.showInvoiceNumberField = true;
      this._popPaymentService
        .getIvoiceNumbers(this.paramId, this.ownerName)
        .map(response => response.json())
        .subscribe(data => {
          if (data.success === true) {
            const originalInvoiceObj = data.sales;
            originalInvoiceObj.map(el => {
              this.allInvoiceNumberArray = [
                ...this.allInvoiceNumberArray,
                el.invoiceNumber,
              ];
            });
          }
        });
    } else {
      this.showInvoiceNumberField = false;
    }
  }
  getParticularNames() {
    this.dataCopy = this._popPaymentService
      .getParticularNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.particularList = data.ledgerData.reverse();
      });
  }

  toggleCheque(value) {
    if (value === 'Cheque') {
      this.showCheque = true;
    } else {
      this.showCheque = false;
    }
  }

  getIncomingData() {
    if (this.editContentId !== this.popContnetId) {
      this.popContnetId = this.editContentId;
      if (this.popContnetId !== '') {
        this._popPaymentService
          .getPaymentFormData(this.paramId, this.popContnetId, this.ownerName)
          .map(response => response.json())
          .subscribe(data => {
            this.fillForm(data.paymentData);
          });
      }
    }
  }

  getLedgerNames() {
    this.dataCopy = this._popPaymentService
      .getLedgerNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  initParticular() {
    return this.fb.group({
      particulars: ['', Validators.required],
      amount: [''],
    });
  }

  onFileChange(event) {
    this.attachmentError = false;
    const reader = new FileReader();

    if (event.target.files[0].size < 400000) {
      if (event.target.files && event.target.files.length > 0) {
        this.form.get('attachment').setValue(event.target.files[0]);
      }
    } else {
      this.attachmentError = true;
    }
  }

  onSubmit(user, action) {
    user.date = new Date(
      user.date.year,
      user.date.month - 1,
      user.date.day
    ).getTime();

    user.drawnOn = new Date(
      user.drawnOn.year,
      user.drawnOn.month - 1,
      user.drawnOn.day
    ).getTime();
    user.contentId = this.popContnetId;
    user.endtotal = this.totalAmount;

    if (action === false) {
      this._popPaymentService
        .editEntry(user, this.paramId, this.editContentId, this.ownerName)
        .subscribe(data => {});

      this.dateRefresh(user);
    } else {
      this._popPaymentService
        .createNewEntry(user, this.paramId, this.ownerName)
        .subscribe(data => {});

      this.dateRefresh(user);
    }
  }
  dateRefresh(user) {
    user.date = new Date(user.date);
    this.form.controls['date'].setValue({
      year: user.date.getFullYear(),
      month: user.date.getMonth() + 1,
      day: user.date.getDate(),
    });

    user.drawnOn = new Date(user.drawnOn);
    this.form.controls['drawnOn'].setValue({
      year: user.drawnOn.getFullYear(),
      month: user.drawnOn.getMonth() + 1,
      day: user.drawnOn.getDate(),
    });
  }
  removeParticular(i: number) {
    const control = <FormArray>this.form.controls['particularsData'];
    control.removeAt(i);
    this.totalSum();
  }
}
