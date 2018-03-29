import { Component, Injectable, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from './../../../../shared/data/sweet-alerts';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PopPaymentService } from './service/popPayment.service';
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
  public selectedIndex = 1;
  public dataCopy: any;
  public paramId: string;
  public totalAmount: number;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = [];
  public attachmentError: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public _popPaymentService: PopPaymentService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // console.log(this.editContentId);
    $.getScript('./assets/js/jquery.steps.min.js');
    $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getIncomingData();
    this.getAccountNames();
    this.getLedgerUGNames();
    this.form = this.fb.group({
      account: [''],
      chequeNumber: [''],
      against: [''],
      attachment: [''],
      date: [''],
      drawnOn: [null, Validators.required],
      endtotal: [''],
      narration: [''],
      paymentNumber: [''],
      paymentThrough: [''],
      paymentType: [''],
      particularsData: this.fb.array([]),
    });
    this.addParticular();
  }

  addParticular() {
    this.totalSum();
    const control = <FormArray>this.form.controls['particularsData'];
    const addCtrl = this.initParticular();
    control.push(addCtrl);
  }

  fillForm(data) {
    console.log(data);
    data = data[0];
    data.date = new Date(data.date);
    data.drawnOn = new Date(data.drawnOn);
    const now = new Date();
    this.form.controls['account'].setValue(data.account);
    this.form.controls['chequeNumber'].setValue(data.chequeNumber);
    this.form.controls['against'].setValue(data.against);
    this.form.controls['date'].setValue({
      year: data.date.getFullYear(),
      month: data.date.getMonth(),
      day: data.date.getDate(),
    });
    this.form.controls['drawnOn'].setValue({
      year: data.drawnOn.getFullYear(),
      month: data.drawnOn.getMonth(),
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
      console.log(element.particulars)
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

  getAccountNames() {
    this.dataCopy = this._popPaymentService
      .getAccountNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.accountList = this.accountList.concat(data.accountNameList);
      });
  }

  // This function is used in open
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  getIncomingData() {
    if (this.editContentId !== this.popContnetId) {
      // console.log(`Content Id: ${this.editContentId}, Pop Content Id: ${this.popContnetId}`);
      this.popContnetId = this.editContentId;
      if (this.popContnetId !== '') {
        this._popPaymentService
          .getPaymentFormData(this.paramId, this.popContnetId)
          .map(response => response.json())
          .subscribe(data => {
            this.fillForm(data.paymentData);
          });
      }
    }
  }

  getLedgerUGNames() {
    this.dataCopy = this._popPaymentService
      .getLedgerUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      // this._popPaymentService.setParamId(this.paramId);
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
    console.log(event.target.files[0].size);
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
    user.contentId = this.popContnetId;
    user.endtotal = this.totalAmount;
    console.log(user);
    if (action === false) {
      console.log('edit');
      this._popPaymentService.editEntry(user, this.paramId, this.editContentId).subscribe(data => {});
    } else {
      this._popPaymentService.createNewEntry(user, this.paramId).subscribe(data => {});
    }
  }

  removeParticular(i: number) {
    const control = <FormArray>this.form.controls['particularsData'];
    control.removeAt(i);
    this.totalSum();
  }

  totalSum() {
    const formControls = this.form.controls.particularsData['controls'];
    this.totalAmount = 0;
    for (let i = 0; i < formControls.length; i++) {
      const amount = formControls[i].controls.amount.value;
      if (!isNaN(amount) && amount !== '') {
        this.totalAmount += parseFloat(amount);
      }
      // console.log(this.totalAmount);
    }
  }
}
