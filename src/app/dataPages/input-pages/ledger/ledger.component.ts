import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';
import { LedgerService } from './service/ledger.service';

declare var $: any;

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent implements OnInit {
  form: FormGroup;
  selectedIndex = 1;
  dataCopy: any;
  paramId: string;
  closeResult: string;
  public items: Array<string> = [
    'cash in hand(dr)',
    'cash at bank(dr)',
    'sales a / c(cr)',
    'purchases a / c(dr)',
    'stock in hand(dr)',
    ' sundry debtors(dr)',
    'sundry creditors(cr)',
    'current asset(dr)',
    'current liabilities(cr)',
    'non - current assets(dr)',
    ' non - current liabilities(cr)',
    'capital(cr)',
    ' bank overdraft(cr)',
    'duties and taxes(cr)',
    ' Deposit(asset)(DR)',
    ' Direct expenses(DR)',
    ' Direct Income(CR)',
    'indirect expense(DR)',
    ' Indirect Income(CR)',
    ' Fixed Asset(DR)',
    ' Investments(DR)',
    ' Loans & advances(Asset)(DR)',
    ' Loans(liability)(CR)',
    ' Reserves and Surplus(CR)',
    ' Provisions(CR)',
    ' Bad debt(DR)',
    ' Suspense.',
  ];
  constructor(
    private route: ActivatedRoute,
    public _ledgerService: LedgerService,
    public fb: FormBuilder,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
     this.route.params.subscribe(params => {
     console.log(params)
   });
    $.getScript('./../../assets/js/jquery.steps.min.js');
    $.getScript('./../../assets/js/wizard-steps.js');
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
      total: [''],
    });
  }
  getUnderGroupList() {
    this.dataCopy = this._ledgerService
      .getUnderGroupList()
      .map(response => response.json())
      .subscribe(data => {
        data = data.ugData.map(item => item.groupName);
        // console.log(data);
        this.items = this.items.concat(data);
        // console.log(this.items);
      });
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(user) {
    user.underGroup = this.form.get('underGroup').value[0].text;
    user.state = this.form.get('state').value[0].text;
    user.country = this.form.get('country').value[0].text;

    console.log(user);
    this._ledgerService.createNewLedger(user).subscribe(data => {
      // console.log('hello gateway service')
    });
  }
}
