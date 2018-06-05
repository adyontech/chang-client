import { Component, HostListener, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './service/payment.service';
import { ToastrService } from './../../../utilities/toastr.service';

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
  public ownerName: string;
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
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
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
      .open(content, { size: "lg", backdrop: "static" })
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

  getLedgerUGNames() {
    this.dataCopy = this._paymentService
      .getLedgerUGNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }
  getAccountNames() {
    this.dataCopy = this._paymentService
      .getAccountNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.accountList = this.accountList.concat(data.accountNameList);
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

  onSubmit(user) {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        user.endtotal = this.totalAmount;
        this._paymentService.createNewEntry(user, this.paramId, this.ownerName).subscribe(data => {
          if (data.success) {
            this._toastrService.typeSuccess('success', 'Data successfully added');
          } else {
            this._toastrService.typeError('Error', data.message);
          }
        });
      } else {
        return;
      }
    });
  }
}
