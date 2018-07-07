import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { StateVaribles } from './../../../shared/forms/States';
import { ActivatedRoute } from '@angular/router';
import { EditLedgerService } from './service/editLedger.service';
import { ToastrService } from './../../../utilities/toastr.service';

declare var $: any;

@Component({
  selector: 'app-ledger',
  templateUrl: './editLedger.component.html',
  styleUrls: ['./editLedger.component.scss'],
})
export class EditLedgerComponent implements OnInit {
  @Input() statePop: string;
  @Input() modalReference: any;
  public allUndergroupData: any;
  public paramId: string;
  public ownerName: string;
  public form: FormGroup;
  public dataCopy: any;
  public closeResult: string;
  public breadcrumbs = [];
  public applicableDummyModel: String = '';
  public autoFillLedgerName: Array<string> = [];
  public stateList: Array<string>;
  public drCrArray: Array<string> = ['DR', 'CR'];
  public underGroupItems: Array<string> = [
    'cash in hand(DR)',
    'cash at bank(DR)',
    'purchases(DR)',
    'stock in hand(DR)',
    'non - current assets(DR)',
    'Deposit(asset)(DR)',
    'Direct expenses(DR)',
    'current asset(DR)',
    'indirect expense(DR)',
    'Bad debt(DR)',
    'Fixed Asset(DR)',
    'Investments(DR)',
    'sundry debtors(DR)',
    'sales(CR)',
    'sundry creditors(CR)',
    'current liabilities(CR)',
    'non - current liabilities(CR)',
    'capital(CR)',
    'bank overdraft(CR)',
    'duties and taxes(CR)',
    'Direct Income(CR)',
    'Indirect Income(CR)',
    'Loans & advances(Asset)(DR)',
    'Loans(liability)(CR)',
    'Reserves and Surplus(CR)',
    'Provisions(CR)',
    'Suspense.',
  ];
  public applicableTaxItems = ['GST', 'Other', 'Not Applicable'];
  public businessTypeItems = ['Goods', 'Services', 'Other'];
  constructor(
    private route: ActivatedRoute,
    public _ledgerService: EditLedgerService,
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
    this.getLedgerNamesId();
    this.form = this.fb.group({
      selectedLedgerName: ['', Validators.required],
      ledgerName: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d- _]+$/),
      ]),
      underGroup: new FormControl('', [Validators.required]),
      applicableTax: new FormControl('', [Validators.required]),
      businessType: new FormControl('', [Validators.required]),
      gstin: new FormControl('', [
        patternValidator(
          /\d{2}[a-zA-Z]{5}\d{4}[a-zA-Z]{1}\d[zZ]{1}[a-zA-Z\d]{1}/
        ),
      ]),
      name: new FormControl('', [patternValidator(/^[a-zA-Z\d- _]+$/)]),
      email: new FormControl('', [
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
      value: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
      type: [''],
    });
  }
  updateTotal() {
    const qty = this.form.get('qty').value || 0,
      rate = this.form.get('rate').value || 0;
    this.form.controls['total'].setValue((qty * rate).toFixed(2));
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      console.log(this.paramId);
      // this._dashboardSettingService.setParamId(this.paramId);
    });
    this.breadcrumbs = [
      { name: 'Ledger' },
      {
        name: 'Dashboard',
        link: `/${this.ownerName}/${this.paramId}/dashboard`,
      },
    ];
  }

  getLedgerNamesId() {
    this.dataCopy = this._ledgerService
      .getLedgerNamesId(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.autoFillLedgerName = data.ledgerData;
      });
  }
  autoFillData(value) {
    this.dataCopy = this._ledgerService
      .autoFillData(value, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data.ledgerData);
        this.form.controls['ledgerName'].setValue(data.ledgerData.ledgerName);
        this.form.controls['underGroup'].setValue(data.ledgerData.underGroup);
        this.form.controls['applicableTax'].setValue(
          data.ledgerData.applicableTax
        );
        this.form.controls['businessType'].setValue(
          data.ledgerData.businessType
        );
        this.form.controls['gstin'].setValue(data.ledgerData.gstin);
        this.form.controls['name'].setValue(data.ledgerData.name);
        this.form.controls['email'].setValue(data.ledgerData.email);
        this.form.controls['pan'].setValue(data.ledgerData.pan);
        this.form.controls['address'].setValue(data.ledgerData.address);
        this.form.controls['city'].setValue(data.ledgerData.city);
        this.form.controls['state'].setValue(data.ledgerData.state);
        this.form.controls['pinCode'].setValue(data.ledgerData.pinCode);
        this.form.controls['country'].setValue(data.ledgerData.country);
        this.form.controls['phoneNumber'].setValue(data.ledgerData.phoneNumber);
        this.form.controls['value'].setValue(data.ledgerData.value);
        this.form.controls['type'].setValue(data.ledgerData.type);
      });
  }

  getUnderGroupList() {
    this.dataCopy = this._ledgerService
      .getUnderGroupList(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.allUndergroupData = data.ugData;
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

  fillCountry(value) {
    if (value !== 'Others') {
      this.form.patchValue({
        country: 'India',
      });
    } else {
      this.form.patchValue({
        country: '',
      });
    }
  }

  changeType(arg) {
    const arg2 = arg.target.value;
    if (arg2.length === 0) {
      this.form.patchValue({
        type: '',
      });
    } else if (arg2.length === 1) {
      const ugName = this.form.get('underGroup').value;
      const ugDrArray = [
        'cash in hand(DR)',
        'cash at bank(DR)',
        'purchases(DR)',
        'stock in hand(DR)',
        'non - current assets(DR)',
        'Deposit(asset)(DR)',
        'Direct expenses(DR)',
        'current asset(DR)',
        'indirect expense(DR)',
        'Bad debt(DR)',
        'Fixed Asset(DR)',
        'Investments(DR)',
        'Loans & advances(Asset)(DR)',
        'sundry debtors(DR)',
      ];
      const ugCrArray = [
        'sales(CR)',
        'sundry creditors(CR)',
        'current liabilities(CR)',
        'non - current liabilities(CR)',
        'capital(CR)',
        'bank overdraft(CR)',
        'duties and taxes(CR)',
        'Direct Income(CR)',
        'Indirect Income(CR)',
        'Loans & advances(Asset)(DR)',
        'Loans(liability)(CR)',
        'Reserves and Surplus(CR)',
        'Provisions(CR)',
        'Suspense.',
      ];
      if (ugDrArray.indexOf(ugName) !== -1) {
        this.form.patchValue({
          type: 'DR',
        });
      } else if (ugCrArray.indexOf(ugName) !== -1) {
        this.form.patchValue({
          type: 'CR',
        });
      } else {
        this.allUndergroupData.map(el => {
          if (el.groupName === ugName) {
            this.form.patchValue({
              type: el.type,
            });
          }
        });
      }
    }
  }

  onSubmit(user) {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        this._ledgerService
          .editNewLedger(user, this.paramId, this.ownerName)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
              // the code is to check whether the window is a pop-up
              // or not, if pop-up then it will close it.
              if (this.statePop === 'child') {
                this.modalReference.close();
              }
              this.form.reset();
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
