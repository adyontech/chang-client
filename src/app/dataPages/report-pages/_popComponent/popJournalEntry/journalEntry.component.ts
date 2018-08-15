import { Component, Input, ViewChild, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { PopJournalEntryService } from './service/journalEntry.service';
import { ToastrService } from '../../../../utilities/toastr.service';
import { GlobalCompanyService } from '../../../../shared/globalServices/oneCallvariables.servce';
import { patternValidator } from '../../../../shared/validators/pattern-validator';
import { DateValidator } from '../../../../shared/validators/dateValidator';

declare var $: any;

@Component({
  selector: 'app-pop-journal',
  templateUrl: './journalEntry.component.html',
  styleUrls: ['./journalEntry.component.scss'],
})
export class PopJournalEntryComponent implements OnInit {
  @Input()
  editContentId: string;
  editupdate: Boolean = false;
  popContnetId = '';

  closeResult: string;
  form: FormGroup;
  dataCopy: any;
  paramId: string;
  public ownerName: string;
  totalAmount: number;
  debitSum: number;
  creditSum: number;
  public ledgerList: Array<string> = [];
  public attachmentError: Boolean = false;
  public attachmentName: String = 'No File Choosen.';

  public minNgbDate;
  public maxNgbDate;
  public modalRef: any;

  constructor(
    private route: ActivatedRoute,
    public _journalEntryService: PopJournalEntryService,
    public fb: FormBuilder,
    public _toastrService: ToastrService,
    public _globalCompanyService: GlobalCompanyService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getIncomingData();
    this.getLedgerNames();
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
      file: [''],
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

  fillForm(data) {
    data.date = new Date(data.date);
    this.form.controls['journalNumber'].setValue(data.referenceNumber);
    this.form.controls['narration'].setValue(data.narration);
    this.form.controls['date'].setValue({
      year: data.date.getFullYear(),
      month: data.date.getMonth() + 1,
      day: data.date.getDate(),
    });
    const particularsData = <FormArray>this.form.controls['particularsData'];
    const oldArray = data.particularsData;
    oldArray.forEach((element, index) => {
      const array = particularsData.at(index);
      if (!array) {
        particularsData.push(
          this.fb.group({
            particulars: [element.particulars],
            drcr: element.drcr,
            debitAmount: element.debitAmount,
            creditAmount: element.creditAmount,
          })
        );
      } else {
        array.patchValue({
          particulars: element.particulars,
          drcr: element.drcr,
          debitAmount: element.debitAmount,
          creditAmount: element.creditAmount,
        });
      }
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

  getLedgerNames() {
    this.dataCopy = this._journalEntryService
      .getLedgerNames(this.paramId, this.ownerName)
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

  getIncomingData() {
    if (this.editContentId !== this.popContnetId) {
      this.popContnetId = this.editContentId;
      if (this.popContnetId !== '') {
        this._journalEntryService
          .getFormData(this.paramId, this.popContnetId, this.ownerName)
          .map(response => response.json())
          .subscribe(data => {
            this.fillForm(data.journalData);
          });
      }
    }
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

  onFileChange(event) {
    this.attachmentError = false;
    const reader = new FileReader();

    if (event.target.files[0].size < 400000) {
      if (event.target.files && event.target.files.length > 0) {
        this.form.get('file').setValue(event.target.files[0]);
      }
    } else {
      this.attachmentError = true;
    }
  }

  onSubmit(user, action) {
    user.contentId = this.popContnetId;
    user.endtotal = this.totalAmount;
    if (action === false) {
      this._journalEntryService
        .editEntry(user, this.paramId, this.editContentId, this.ownerName)
        .subscribe(data => {});
    } else {
      this._journalEntryService
        .createNewEntry(user, this.paramId, this.ownerName)
        .subscribe(data => {});
    }
  }
}
