import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContraService } from './service/contra.service';
declare var $: any;

@Component({
  selector: 'app-contra',
  templateUrl: './contra.component.html',
  styleUrls: ['./contra.component.scss'],
})
export class ContraComponent implements OnInit {
  form: FormGroup;
  selectedIndex = 1;
  dataCopy: any;
  paramId: string;
  closeResult: string;
  public totalAmount: number;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = [];

  public value: any = {};
  public _disabledV: String = '0';
  public disabled: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public _contraService: ContraService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAccountNames();
    this.getLedgerUGNames();
    this.form = this.fb.group({
      account: [''],
      chequeNumber: [''],
      contraNumber: [''],
      date: [''],
      drawnOn: [null, Validators.required],
      drawnBank: [''],
      file: [''],
      narration: [''],
      particularsData: this.fb.array([]),
    });
    this.addParticular();
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
    this.dataCopy = this._contraService
      .getLedgerUGNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }
  getAccountNames() {
    this.dataCopy = this._contraService
      .getAccountNames(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.accountList = this.accountList.concat(data.accountNameList);
      });
  }

  get formData() {
    return <FormArray>this.form.get('particularsData');
  }

  onSubmit(user) {
    console.log(user);
    this._contraService.createNewEntry(user, this.paramId).subscribe(data => {});
  }
}
