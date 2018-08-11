import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LedgerService } from './service/ledger.service';
import {
  NgbDateStruct,
  NgbDatepickerI18n,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import { GlobalCompanyService } from '../../../shared/globalServices/oneCallvariables.servce';

declare var $: any;

@Component({
  selector: 'app-ledger-out',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent implements OnInit {
  public queryLedgerParam;
  public totalNet: number;
  public newTotalNet: number;
  public netDebitAmount: number;
  public netCreditAmount: number;

  public companyStartingDate;
  public companyEndingDate;

  public choosenStartDate;
  public csd;
  public choosenEndDate;
  public ced;
  public showStartDateError: Boolean = false;
  public showEndDateError: Boolean = false;
  public minNgbDate;
  public maxNgbDate;

  public choosenLedgerName: string;
  public LedgerData = [];
  public mainLedgerData = [];
  public form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;

  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings = {};
  public breadcrumbs = [];
  public ledgerNameArray: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public _ledgerService: LedgerService,
    public fb: FormBuilder,
    public _globalCompanyService: GlobalCompanyService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getGlobalCompanyData();
    this.getLedgerNames();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
    this.route.queryParams.subscribe(params => {
      if (params.ledgerName !== undefined) {
        this.choosenLedgerName = params.ledgerName.split('%20').join(' ');
        this.getIncomingData(this.companyStartingDate, this.companyEndingDate);
      }
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
    this.choosenLedgerName = value;
    this.getIncomingData(this.companyStartingDate, this.companyEndingDate);
  }
  getIncomingData(filterStartDate, filterEndDate) {
    this.dataCopy = this._ledgerService
      .getIncomingData(
        this.paramId,
        this.ownerName,
        this.choosenLedgerName,
        filterStartDate,
        filterEndDate
      )
      .map(response => response.json())
      .subscribe(data => {
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
          this.ledgerNameArray = this.ledgerNameArray.concat(data.ledgerData);
        }
      });
  }

  getGlobalCompanyData() {
    this.dataCopy = this._globalCompanyService
      .getGlobalCompanyData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.companyStartingDate = data.startDate;
        this.companyEndingDate = data.endDate;
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
        this.choosenEndDate = maxD;
        // calling it here so that it will run after global date set
        this.dateFilterRefresh();
      });
  }

  dateRangeValidator(arg) {
    if (arg !== null && typeof arg === 'object') {
      const dateVal = new Date(arg.year, arg.month - 1, arg.day).getTime();

      if (
        dateVal > 0 &&
        dateVal >= this.companyStartingDate &&
        dateVal <= this.companyEndingDate
      ) {
        return { allow: true, date: dateVal };
      } else {
        this.LedgerData = [];
        return { allow: false, date: null };
      }
    } else {
      this.LedgerData = [];

      return { allow: false, date: null };
    }
  }

  startDate(value) {
    const dateReturn = this.dateRangeValidator(value);
    if (dateReturn.allow) {
      this.showStartDateError = false;
      this.choosenStartDate = dateReturn.date;
      this.setDateFilter();
    } else {
      this.showStartDateError = true;
      this.choosenStartDate = this.companyStartingDate;
    }
  }

  endDate(value) {
    console.log(value);
    const dateReturn = this.dateRangeValidator(value);
    console.log(dateReturn);
    if (dateReturn.allow) {
      this.showEndDateError = false;
      this.choosenEndDate = dateReturn.date;
      this.setDateFilter();
    } else {
      this.showEndDateError = true;
      this.choosenEndDate = this.companyEndingDate;
    }
  }

  setDateFilter() {
    this.LedgerData = this.mainLedgerData.filter(el => {
      if (
        el.date >= this.choosenStartDate &&
        el.date <= this.choosenEndDate &&
        el.date >= this.companyStartingDate &&
        el.date <= this.companyEndingDate
      ) {
        return el;
      }
    });
  }

  dateFilterRefresh() {
    this.choosenStartDate = this.companyStartingDate;
    this.choosenEndDate = this.companyEndingDate;
  }

  deleteEntry(entryId) {}
}
