import { Component, Input, ViewChild, OnInit } from '@angular/core';
// import { , ValidatorFn, FormGroup } from '@angular/forms';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { StateVaribles } from './../../../shared/forms/States';
import { ActivatedRoute } from '@angular/router';
import { LedgerService } from './service/ledger.service';
import { ToastrService } from './../../../utilities/toastr.service';

declare var $: any;

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent implements OnInit {
  @Input() statePop: string;
  @Input() modalReference: any;
  public paramId: string;
  public ownerName: string;
  public form: FormGroup;
  public dataCopy: any;
  public closeResult: string;
  public breadcrumbs = [];
  public applicableDummyModel: string = '';
  public stateList: Array<string>;
  public underGroupItems: Array<string> = [
    'cash in hand(dr)',
    'cash at bank(dr)',
    'sales(cr)',
    'purchases(dr)',
    'stock in hand(dr)',
    'sundry debtors(dr)',
    'sundry creditors(cr)',
    'current asset(dr)',
    'current liabilities(cr)',
    'non - current assets(dr)',
    'non - current liabilities(cr)',
    'capital(cr)',
    'bank overdraft(cr)',
    'duties and taxes(cr)',
    'Deposit(asset)(DR)',
    'Direct expenses(DR)',
    'Direct Income(CR)',
    'indirect expense(DR)',
    'Indirect Income(CR)',
    'Fixed Asset(DR)',
    'Investments(DR)',
    'Loans & advances(Asset)(DR)',
    'Loans(liability)(CR)',
    'Reserves and Surplus(CR)',
    'Provisions(CR)',
    'Bad debt(DR)',
    'Suspense.',
  ];
  public applicableTaxItems = ['GST', 'Other', 'Not Applicable'];
  public businessTypeItems = ['Goods', 'Services', 'Other'];
  constructor(
    private route: ActivatedRoute,
    public _ledgerService: LedgerService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    public _toastrService: ToastrService,
    public _stateVariables: StateVaribles
  ) {
    this.stateList = this._stateVariables.stateListArray;
  }
  ngOnInit() {
    // $.getScript('./assets/js/jquery.steps.min.js');
    // $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getUnderGroupList();
    this.form = this.fb.group({
      ledgerName: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
      ]),
      underGroup: new FormControl('', [Validators.required]),
      applicableTax: new FormControl('', [Validators.required]),
      businessType: new FormControl('', [Validators.required]),
      gstin: new FormControl('', [Validators.required]),
      name: new FormControl('', [patternValidator(/^[a-zA-Z\d-_]+$/)]),
      email: new FormControl('', [
        Validators.required,
        patternValidator(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      pan: new FormControl('', [
        patternValidator(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
      ]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [patternValidator(/^[1-9][0-9]{5}$/)]),
      country: [''],
      phoneNumber: new FormControl('', [patternValidator(/^[0]?[6789]\d{9}$/)]),
      qty: new FormControl('', [Validators.required,patternValidator(/^\d+$/)]),
      rate: new FormControl('', [Validators.required,patternValidator(/^\d+$/)]),
      total: new FormControl('', [patternValidator(/^\d+$/)]),
    });
  }
  updateTotal() {
    const qty = this.form.get('qty').value || 0,
      rate = this.form.get('rate').value || 0;
    this.form.controls['total'].setValue(qty * rate);
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
    this.breadcrumbs = [
      { name: 'Ledger Form' },
      {
        name: 'Dasboard',
        link: `/${this.ownerName}/${this.paramId}/dashboard`,
      },
    ];
  }
  getUnderGroupList() {
    this.dataCopy = this._ledgerService
      .getUnderGroupList(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        data = data.ugData.map(item => item.groupName);
        this.underGroupItems = this.underGroupItems.concat(data);
      });
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  fillName(value) {
    this.form.patchValue({
      name: value,
    });
  }
  fillCountry(value){
    if(value !== 'Others'){
      this.form.patchValue({
      country: 'India',
    });
    }else{
      this.form.patchValue({
      country: '',
    });
    }
  }
  // onSubmit(user) {
  onSubmit() {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        const user = this.form.getRawValue();
        this._ledgerService
          .createNewLedger(user, this.paramId, this.ownerName)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
              //the code is to check whether the window is a pop-up
              // or not, if pop-up then it will close it.
              if (this.statePop == 'child') {
                this.modalReference.close();
              }
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
