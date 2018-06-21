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
import { ReceiptService } from './service/receipt.service';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import { ToastrService } from './../../../utilities/toastr.service';

declare var $: any;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  public closeResult: string;
  public form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public totalAmount: number;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = ['Cash'];
  public attachmentError: Boolean = false;
  public value: any = {};
  public attachmentName: String = 'No File Choosen.';
  public showCheque = false;
  public showInvoiceNumberField = false;
  public allInvoiceNumberArray: Array<string> = [];
  public receiptTypeArray: Array<string> = [
    'General',
    'Sales receipt',
    'Advance receipt',
    'Purchase refund',
    'Others',
  ];
  public receiptThroughArray: Array<string> = [
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

  breadcrumbs = [{ name: 'Receipt' }, { name: 'Dashboard', link: '/' }];

  constructor(
    private route: ActivatedRoute,
    public _receiptService: ReceiptService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    $.getScript('./assets/js/jquery.steps.min.js');
    $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getAccountNames();
    this.getLedgerNames();
    this.form = this.fb.group({
      receiptNumber: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),
      date: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          DateValidator.datevalidator('5', '4'),
        ])
      ),
      account: new FormControl('', [Validators.required]),
      receiptType: new FormControl('', [Validators.required]),
      receiptThrough: new FormControl('', [Validators.required]),
      againstInvoiceNumber: [''],
      chequeNumber: [''],
      drawnOn: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          DateValidator.datevalidator('5', '4'),
        ])
      ),
      against: new FormControl('', [Validators.required]),
      particularsData: this.fb.array([]),
      narration: [''],
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
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.getAccountNames();
        this.getLedgerNames();
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.getAccountNames();
        this.getLedgerNames();
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
      amount: new FormControl('', [
        Validators.required,
        patternValidator(/^\d+$/),
      ]),
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
    if (value === 'Sales receipt' || value === 'Advance receipt') {
      this.againstArray = [...this.againstArray, 'Advance receipt'];
      this.form.patchValue({
        against: 'Advance receipt',
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
      this._receiptService
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

  getLedgerNames() {
    this.dataCopy = this._receiptService
      .getLedgerNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }
  getAccountNames() {
    this.dataCopy = this._receiptService
      .getAccountNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
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
        this._receiptService
          .createNewEntry(user, this.paramId, this.ownerName)
          .subscribe(data => {
            console.log(data);
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
