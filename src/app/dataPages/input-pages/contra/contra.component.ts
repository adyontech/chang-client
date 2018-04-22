import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
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
  closeResult: string;
  form: FormGroup;
  selectedIndex = 1;
  dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public totalAmount: number;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = [];
  public attachmentError: Boolean = false;
  public fileName: String = 'No File Choosen.';

  public value: any = {};
  public _disabledV: String = '0';
  public disabled: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public _contraService: ContraService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getAccountNames();
    this.getLedgerUGNames();
    this.form = this.fb.group({
      account: [''],
      chequeNumber: [''],
      contraNumber: [''],
      date: [''],
      drawnOn: [null, Validators.required],
      drawnBank: [''],
      attachment: [''],
      narration: [''],
      particularsData: this.fb.array([]),
      endtotal: [''],
    });
    this.addParticular();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed `;
      }
    );
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
      .getLedgerUGNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        if (data.success !== false) {
          this.ledgerList = this.ledgerList.concat(data.ledgerData);
        }
      });
  }

  getAccountNames() {
    this.dataCopy = this._contraService
      .getAccountNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        if (data.success !== false) {
          this.accountList = this.accountList.concat(data.accountNameList);
        }
      });
  }

  get formData() {
    return <FormArray>this.form.get('particularsData');
  }

  onFileChange(event) {
    this.attachmentError = false;
    const reader = new FileReader();

    if (event.target.files[0].size < 200000) {
      if (event.target.files && event.target.files.length > 0) {
        this.form.get('attachment').setValue(event.target.files[0]);
        this.fileName = event.target.files[0].name;
      }
    } else {
      this.attachmentError = true;
      this.fileName = 'No File choosen';
    }
  }

  onSubmit(user) {
    // alertFunctions.SaveData().then(datsa => {
    //   if (datsa) {
    console.log(user);
    user.endtotal = this.totalAmount;
    this._contraService.createNewEntry(user, this.paramId).subscribe(data => {});
    //   }
    // });
  }
}
