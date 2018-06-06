import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TitleCasePipe } from '@angular/common';
import * as alertFunctions from './../../../shared/data/sweet-alerts';

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
  public paramId: string;
  public ownerName: string;
  public form: FormGroup;
  public dataCopy: any;
  public closeResult: string;
  public underGroupItems: Array<string> = [
    'cash in hand(dr)',
    'cash at bank(dr)',
    'sales a / c(cr)',
    'purchases a / c(dr)',
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
    public _toastrService: ToastrService
  ) {}
  ngOnInit() {
    // $.getScript('./assets/js/jquery.steps.min.js');
    // $.getScript('./assets/js/wizard-steps.js');
    this.getRouteParam();
    this.getUnderGroupList();
    this.form = this.fb.group({
      ledgerName: [''],
      underGroup: [''],
      applicableTax: [''],
      businessType: [''],
      gstin: [''],
      name: [''],
      email: [''],
      pan: [''],
      address: [''],
      city: [''],
      state: [''],
      pinCode: [''],
      country: [''],
      phoneNumber: [''],
      qty: [''],
      rate: [''],
      total: [{ value: '', disabled: true }],
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
  }
  getUnderGroupList() {
    this.dataCopy = this._ledgerService
      .getUnderGroupList(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data)
        data = data.ugData.map(item => item.groupName);
        this.underGroupItems = this.underGroupItems.concat(data);
      });
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // onSubmit(user) {
  onSubmit() {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
    const user = this.form.getRawValue();
    this._ledgerService.createNewLedger(user, this.paramId, this.ownerName).subscribe(data => {
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
