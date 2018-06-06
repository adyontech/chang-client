import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as alertFunctions from './../../../../shared/data/sweet-alerts';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PopReceiptService } from './service/receipt.service';

declare var $: any;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class PopReceiptComponent implements OnInit {
  public closeResult: string;
  public form: FormGroup;
  public selectedIndex = 1;
  public dataCopy: any;
  public paramId: string;
  public totalAmount: number;
  public attachmentError: Boolean = false;

  public ledgerList: Array<string> = [];
  public accountList: Array<string> = ['Cash'];

  public value: any = {};
  public _disabledV: String = '0';
  public disabled: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    public _receiptService: PopReceiptService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    $.getScript('./assets/js/jquery.steps.min.js');
    $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getAccountNames();
    this.getLedgerNames();
    this.form = this.fb.group({
      receiptNumber: [''],
      date: [''],
      account: [''],
      receiptType: [''],
      receiptThrough: [''],
      chequeNumber: [''],
      drawnOn: [null, Validators.required],
      against: [''],
      particularsData: this.fb.array([]),
      narration: [''],
      file: [''],
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
    this.modalService
      .open(content, { size: "lg" })
      .result.then(
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
  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
    });
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
    this.totalSum();
    const control = <FormArray>this.form.controls['particularsData'];
    control.removeAt(i);
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

  getLedgerNames() {
    this.dataCopy = this._receiptService
      .getLedgerNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }
  getAccountNames() {
    this.dataCopy = this._receiptService
      .getAccountNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.accountList = this.accountList.concat(data.accountNameList);
      });
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
    // alertFunctions.SaveData().then(datsa => {
    //   if (datsa) {
    console.log(user);

    user.endtotal = this.totalAmount;
    this._receiptService.createNewEntry(user, this.paramId).subscribe(data => { });
    //   }
    // });
  }
}