import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { JournalEntryService } from './service/journalEntry.service';
import { ToastrService } from './../../../utilities/toastr.service';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import { DateValidator } from './../../../shared/validators/dateValidator';
import { GlobalCompanyService } from './../../../shared/globalServices/oneCallvariables.servce';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journalEntry.component.html',
  styleUrls: ['./journalEntry.component.scss'],
})
export class JournalEntryComponent implements OnInit {
  public closeResult: string;
  public form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public totalAmount: number;
  public debitSum: number;
  public creditSum: number;
  public minNgbDate;
  public maxNgbDate;
  public ledgerList: Array<string> = [];
  public breadcrumbs = [
    { name: 'Journal  Entry' },
    { name: 'Dashboard', link: '/' },
  ];
  public value: any = {};
  public attachmentError: Boolean = false;
  public attachmentName: String = 'No File Choosen.';

  constructor(
    private route: ActivatedRoute,
    public _journalEntryService: JournalEntryService,
    public fb: FormBuilder,
    public _toastrService: ToastrService,
    public _globalCompanyService: GlobalCompanyService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getGlobalCompanyData();
    this.getLedgerUGNames();
    this.form = this.fb.group({
      journalNumber: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),
      date: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
      ),
      narration: [''],
      particularsData: this.fb.array([]),
      attachment: [''],
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

  initParticular() {
    return this.fb.group({
      particulars: ['', Validators.required],
      drcr: ['', Validators.required],
      debitAmount: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
      creditAmount: new FormControl('', [patternValidator(/^-?\d*(\.\d+)?$/)]),
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
      .getLedgerUGNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  public resetDrCr(value: any, indexValue): void {
    const particularsData = <FormArray>this.form.controls['particularsData'];
    const array = particularsData.at(indexValue);
    array.patchValue({
      debitAmount: 0,
      creditAmount: 0,
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

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        const minD = new Date(parseInt(data.startDate, 0));
        this.minNgbDate = {
          year: minD.getFullYear(),
          month: minD.getMonth()+1,
          day: minD.getDate(),
        };
        const maxD = new Date(parseInt(data.endDate, 0));
        this.maxNgbDate = {
          year: maxD.getFullYear(),
          month: maxD.getMonth()+1,
          day: maxD.getDate(),
        };
      });
  }
  dateRangeValidator(arg) {
    console.log(arg);
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
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        this._journalEntryService
          .createNewEntry(user, this.paramId, this.ownerName)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
            } else {
              this._toastrService.typeError('Error', data.message);
            }
          });
      }
    });
  }
}
