import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { JournalEntryService } from './service/journalEntry.service';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journalEntry.component.html',
  styleUrls: ['./journalEntry.component.scss'],
})
export class JournalEntryComponent implements OnInit {
  form: FormGroup;
  dataCopy: any;
  paramId: string;
  totalAmount: number;
  debitSum: number;
  creditSum: number;
  public ledgerList: Array<string> = [];

  public value: any = {};
  public _disabledV: String = '0';
  public disabled: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    public _journalEntryService: JournalEntryService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getLedgerUGNames();
    this.form = this.fb.group({
      journalNumber: [''],
      date: [''],
      narration: [''],
      particularsData: this.fb.array([]),
      file: [''],
    });
    this.addParticular();
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
      drcr: [''],
      debitAmount: [''],
      creditAmount: [''],
    });
  }
  addParticular() {
    // this.totalSum();
    const control = <FormArray>this.form.controls['particularsData'];
    const addCtrl = this.initParticular();
    control.push(addCtrl);
  }
  removeParticular(i: number) {
    // this.totalSum();
    const control = <FormArray>this.form.controls['particularsData'];
    control.removeAt(i);
  }

  get formData() {
    return <FormArray>this.form.get('particularsData');
  }

  getLedgerUGNames() {
    this.dataCopy = this._journalEntryService
      .getLedgerUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  public resetDrCr(value: any, indexValue): void {
    const particularsData = <FormArray>this.form.controls['particularsData'];
    const array = particularsData.at(indexValue);
    array.patchValue({
      debitAmount: '',
      creditAmount: '',
    });
  }

  totalSum() {
    const formControls = this.form.controls.particularsData['controls'];
    this.debitSum = 0;
    this.creditSum = 0;
    for (let i = 0; i < formControls.length; i++) {
      const debitAmount = formControls[i].controls.debitAmount.value;
      const creditAmount = formControls[i].controls.creditAmount.value;

      if (!isNaN(debitAmount) && debitAmount !== '') {
        this.debitSum += parseFloat(debitAmount);
      }
      if (!isNaN(creditAmount) && creditAmount !== '') {
        this.creditSum += parseFloat(creditAmount);
      }
    }
  }

  onSubmit(user) {
    console.log(user);
    this._journalEntryService.createNewEntry(user, this.paramId).subscribe(data => {});
  }
}
