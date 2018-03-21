import { Component, HostListener, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './service/payment.service';
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  closeResult: string;
  public form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public totalAmount: number;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = [];
  public attachmentError: Boolean = false;
  breadcrumbs = [{ name: 'Payment' }, { name: 'Forms', link: '/form/' }, { name: 'Dasboard', link: '/' }];

  constructor(
    private route: ActivatedRoute,
    public _paymentService: PaymentService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    $.getScript('./assets/js/jquery.steps.min.js');
    $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getAccountNames();
    this.getLedgerUGNames();
    this.form = this.fb.group({
      paymentNumber: [''],
      date: [''],
      account: [''],
      paymentType: [''],
      paymentThrough: [''],
      chequeNumber: [''],
      drawnOn: [null, Validators.required],
      particularsData: this.fb.array([]),
      narration: [''],
      against: [''],
      attachment: [''],
      endtotal: [''],
    });
    this.addParticular();
  }

  // To open modal we need key event here
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 66 && event.ctrlKey) {
      document.getElementById('openModalButton').click();
    }
  }
  open(content) {
    this.modalService.open(content).result.then(
      result => {
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

  initParticular() {
    return this.fb.group({
      particulars: ['', Validators.required],
      amount: [''],
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

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      // this._paymentService.setParamId(this.paramId);
    });
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

  getLedgerUGNames() {
    this.dataCopy = this._paymentService
      .getLedgerUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }
  getAccountNames() {
    this.dataCopy = this._paymentService
      .getAccountNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.accountList = this.accountList.concat(data.accountNameList);
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

  onSubmit(user) {
    console.log('you clicked it');
    console.log(user);
    // alertFunctions.SaveData().then(datsa => {
    //   if (datsa) {
    // user.date = new Date(user.date.year, user.date.month, user.date.day);
    // user.drawnOn = new Date(user.drawnOn.year, user.drawnOn.month, user.drawnOn.day);

    user.endtotal = this.totalAmount;
    this._paymentService.createNewEntry(user, this.paramId).subscribe(data => {});
    // } else {
    //   return;
    // }
    // });
  }
}
