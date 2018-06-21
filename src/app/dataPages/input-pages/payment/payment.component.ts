import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DateValidator } from './../../../shared/validators/dateValidator';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './service/payment.service';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import { ToastrService } from './../../../utilities/toastr.service';

declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public closeResult: string;
  public form: FormGroup;
  public dataCopy: any;
  public modalRef: any;
  public paramId: string;
  public ownerName: string;
  public totalAmount: number;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = [];
  public attachmentError: Boolean = false;
  public attachmentName: String = 'No File Choosen.';
  public showCheque = false;
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
    'others',
  ];

  public value: any = {};
  public breadcrumbs = [{ name: 'Payment' }, { name: 'Dasboard', link: '/' }];

  constructor(
    private route: ActivatedRoute,
    public _paymentService: PaymentService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    $.getScript('./assets/js/jquery.steps.min.js');
    $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getAccountNames();
    this.getLedgerUGNames();
    this.form = this.fb.group({
      paymentNumber: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),
      date: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          DateValidator.datevalidator('2', '3'),
        ])
      ),
      account: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      paymentThrough: new FormControl('', [Validators.required]),
      chequeNumber: [''],
      againstInvoiceNumber: [''],
      drawnOn: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          DateValidator.datevalidator('2', '3'),
        ])
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

  open(content) {
    this.modalRef = this.modalService.open(content, { size: 'lg' });
    this.modalRef.result.then(
      result => {
        this.getAccountNames();
        this.getLedgerUGNames();
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.getAccountNames();
        this.getLedgerUGNames();
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

  initParticular() {
    return this.fb.group({
      particulars: ['', Validators.required],
      amount: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
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

  setAgainst(value) {
    this.showInvoiceNumberField = false;
    if (value === 'Purchase payment' || value === 'Sales refund') {
      this.againstArray = [...this.againstArray, 'Sales refund'];
      this.form.patchValue({
        against: 'Sales refund',
      });
    } else {
      this.showInvoiceNumberField = false;
      this.form.patchValue({
        against: '',
      });
    }
  }
  showInvoiceNumber(value) {
    if (value === 'Against invoice') {
      this.showInvoiceNumberField = true;
      this._paymentService
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

  toggleCheque(value) {
    if (value === 'Cheque') {
      this.showCheque = true;
    } else {
      this.showCheque = false;
    }
  }

  getLedgerUGNames() {
    this.dataCopy = this._paymentService
      .getLedgerUGNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = [];
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }
  getAccountNames() {
    this.dataCopy = this._paymentService
      .getAccountNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.accountList = [];
        this.accountList = this.accountList.concat(data.accountNameList);
      });
  }

  onFileChange(event) {
    this.attachmentError = false;
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
    console.log(user.date);
    user.date = new Date(
      user.date.year,
      user.date.month,
      user.date.day
    ).getTime();
    user.drawnOn = new Date(
      user.drawnOn.year,
      user.drawnOn.month,
      user.drawnOn.day
    ).getTime();
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        user.endtotal = this.totalAmount;
        this._paymentService
          .createNewEntry(user, this.paramId, this.ownerName)
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
      user.drawnOn = new Date(user.drawnOn);
      this.form.controls['drawnOn'].setValue({
        year: user.drawnOn.getFullYear(),
        month: user.drawnOn.getMonth(),
        day: user.drawnOn.getDate(),
      });
    });
  }
}
