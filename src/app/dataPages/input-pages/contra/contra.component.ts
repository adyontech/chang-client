import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { ContraService } from './service/contra.service';
import { patternValidator } from '../../../shared/validators/pattern-validator';
import { DateValidator } from '../../../shared/validators/dateValidator';
import { ToastrService } from '../../../utilities/toastr.service';
import { GlobalCompanyService } from '../../../shared/globalServices/oneCallvariables.servce';

declare var $: any;

@Component({
  selector: 'app-contra',
  templateUrl: './contra.component.html',
  styleUrls: ['./contra.component.scss'],
})
export class ContraComponent implements OnInit {
  closeResult: string;
  form: FormGroup;
  dataCopy: any;
  public modalRef: any;
  public paramId: string;
  public ownerName: string;
  public totalAmount: number;
  public minNgbDate;
  public maxNgbDate;
  public ledgerList: Array<string> = [];
  public accountList: Array<string> = [];
  public attachmentError: Boolean = false;
  public attachmentName: String = 'No File Choosen.';

  breadcrumbs = [{ name: 'Contra' }, { name: 'Dashboard', link: '/' }];
  public value: any = {};
  public _disabledV: String = '0';
  public disabled: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public _contraService: ContraService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    public _toastrService: ToastrService,
    public _globalCompanyService: GlobalCompanyService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getAccountNames();
    this.getGlobalCompanyData();
    // this.getLedgerUGNames();
    this.form = this.fb.group({
      contraNumber: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),
      account: new FormControl('', [Validators.required]),
      chequeNumber: new FormControl('', [
        patternValidator(/^\d+$/),
        Validators.maxLength(20),
      ]),
      date: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
      ),
      drawnOn: new FormControl(
        '',
        Validators.compose([DateValidator.datevalidator])
      ),
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
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { size: 'lg' });
    this.modalRef.result.then(
      result => {
        this.getAccountNames();
        // this.getLedgerUGNames();
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.getAccountNames();
        // this.getLedgerUGNames();
        this.closeResult = `Dismissed `;
      }
    );
  }

  initParticular() {
    return this.fb.group({
      particulars: ['', Validators.required],
      amount: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
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

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        const minD = new Date(parseInt(data.startDate, 0));
        this.minNgbDate = {
          year: minD.getFullYear(),
          month: minD.getMonth() + 1,
          day: minD.getDate(),
        };
        const maxD = new Date(parseInt(data.endDate, 0));
        this.maxNgbDate = {
          year: maxD.getFullYear(),
          month: maxD.getMonth() + 1,
          day: maxD.getDate(),
        };
      });
  }

  dateRangeValidator(arg) {
    let dateError;
    const dateVal = this.form.get(arg).value;
    if (typeof dateVal === 'object') {
      dateError = this._globalCompanyService.dateRangeValidator(
        dateVal,
        this.minNgbDate,
        this.maxNgbDate
      );
    }
    console.log(dateError);
    if (dateError) {
      this.form.controls[arg].setErrors({ dateIncorrect: true });
    }
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

  SetDrawnOn(value) {
    if (value !== null) {
      const dateval = new Date(value.year, value.month, value.day);
      this.form.controls['drawnOn'].setValue({
        year: dateval.getFullYear(),
        month: dateval.getMonth(),
        day: dateval.getDate(),
      });
    }
  }
  // getLedgerUGNames() {
  //   this.dataCopy = this._contraService
  //     .getLedgerUGNames(this.paramId, this.ownerName)
  //     .map(response => response.json())
  //     .subscribe(data => {
  //       if (data.success !== false) {
  //         this.ledgerList = [];
  //         this.ledgerList = this.ledgerList.concat(data.ledgerData);
  //       }
  //     });
  // }

  getAccountNames() {
    this.dataCopy = this._contraService
      .getAccountNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        if (data.success !== false) {
          this.accountList = [];
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
        this.attachmentName = event.target.files[0].name;
      }
    } else {
      this.attachmentError = true;
      this.attachmentName = 'No File choosen';
    }
  }

  onSubmit(user) {
    console.log(user.date);
    user.date = new Date(
      user.date.year,
      user.date.month - 1,
      user.date.day
    ).getTime();
    user.drawnOn = new Date(
      user.drawnOn.year,
      user.drawnOn.month - 1,
      user.drawnOn.day
    ).getTime();
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        user.endtotal = this.totalAmount;
        this._contraService
          .createNewEntry(user, this.paramId, this.ownerName)
          .subscribe(data => {
            // this.form.reset();
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
            } else {
              this._toastrService.typeError('Error', data.message);
            }
          });
        this.dateRefresh(user);
      } else {
        this.dateRefresh(user);
        return;
      }
    });
  }

  dateRefresh(user) {
    user.date = new Date(user.date);
    this.form.controls['date'].setValue({
      year: user.date.getFullYear(),
      month: user.date.getMonth() + 1,
      day: user.date.getDate(),
    });
    console.log(user.date);
    user.drawnOn = new Date(user.drawnOn);
    this.form.controls['drawnOn'].setValue({
      year: user.drawnOn.getFullYear(),
      month: user.drawnOn.getMonth() + 1,
      day: user.drawnOn.getDate(),
    });
  }
  resetForm() {
    this.form.reset();
  }
}
