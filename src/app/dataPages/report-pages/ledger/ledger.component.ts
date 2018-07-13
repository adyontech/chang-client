import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LedgerService } from './service/ledger.service';
import {
  NgbDateStruct,
  NgbDatepickerI18n,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import { GlobalCompanyService } from './../../../shared/globalServices/oneCallvariables.servce';

declare var $: any;

@Component({
  selector: 'app-ledger-out',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent implements OnInit {
  // Models
  // boxHidden: Boolean = false;
  haveData: Boolean = true;
  defaultLedgerSelect: String;
  totalNet: number;
  newTotalNet: number;
  accountBalance: number;
  netDebitAmount: number;
  netCreditAmount: number;
  public dateFrom: Date;
  public dateTo: Date;
  public dropdFilter: string;
  startingDate;
  endingDate;
  showStartDateError: Boolean = false;
  showEndDateError: Boolean = false;
  public minNgbDate;
  public maxNgbDate;

  LedgerData = [];
  mainLedgerData = [];
  form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public closeResult: string;

  dropdownList = [];
  selectedItems = [];
  public breadcrumbs = [];
  dropdownSettings = {};
  public ledgerContent: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public _ledgerService: LedgerService,
    public fb: FormBuilder,
    public _globalCompanyService: GlobalCompanyService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getLedgerNames();
    this.getGlobalCompanyData();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
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

  public onAdd(value: any): void {
    this._ledgerService.ledgerName = value;
    this.dataCopy = this._ledgerService
      .getIncomingData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        // data.formData.length === 0
        //   ? (this.haveData = true)
        //   : (this.haveData = null);
        this.mainLedgerData = data.formData;
        this.LedgerData = data.formData;
        this.totalNet = data.amountObj.totalNet;
        this.newTotalNet = Math.abs(this.totalNet);
        this.netDebitAmount = data.amountObj.debitAmount;
        this.netCreditAmount = data.amountObj.creditAmount;
      });
  }

  getLedgerNames() {
    this.dataCopy = this._ledgerService
      .getLedgerNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        if (data.success === true) {
          this.ledgerContent = this.ledgerContent.concat(data.ledgerData);
        }
      });
  }

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.startingDate = data.startDate;
        this.endingDate = data.endDate;
        const minD = new Date(parseInt(data.startDate, 0));
        this.minNgbDate = {
          year: minD.getFullYear(),
          month: minD.getMonth() + 1,
          day: minD.getDate(),
        };
        const maxD = new Date(parseInt(data.endDate, 0));
        console.log(data.endDate);
        this.maxNgbDate = {
          year: maxD.getFullYear(),
          month: maxD.getMonth() + 1,
          day: maxD.getDate(),
        };
      });
  }

  dateRangeValidator(arg) {
    const dateVal = new Date(arg.year, arg.month, arg.day).getTime();
    if (dateVal >= this.startingDate && dateVal <= this.endingDate) {
      return true;
    } else {
      return false;
    }
  }

  startDate(value) {
    this.showStartDateError = this.dateRangeValidator(value);
    // console.log(this.showStartDateError);
    if (
      value !== null &&
      typeof value === 'object' &&
      this.mainLedgerData.length !== 0
    ) {
      // if(value.yea)
      const newStartingDate = new Date(
        value.year,
        value.month - 1,
        value.day
      ).getTime();
      this.LedgerData = this.mainLedgerData.filter(el => {
        if (el.date > newStartingDate && newStartingDate > this.minNgbDate) {
          console.log(el);
          return el;
        }
      });
    }
    console.log(this.LedgerData);
  }
  endDate(value) {
    this.dateRangeValidator(value);
    console.log(value);
    if (
      value !== null &&
      typeof value === 'object' &&
      this.mainLedgerData.length !== 0
    ) {
      // if(value.yea)
      const newStartingDate = new Date(
        value.year,
        value.month,
        value.day
      ).getTime();
      this.LedgerData = this.mainLedgerData.filter(el => {
        if (el.date > newStartingDate && newStartingDate > this.minNgbDate) {
          console.log(el);
          return el;
        }
      });
    }
    console.log(this.LedgerData);
  }

  deleteEntry(entryId) {}
}
