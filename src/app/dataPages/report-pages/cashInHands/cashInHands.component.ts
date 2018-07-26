import { Component, Input, ViewChild, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CashInHandsService } from './service/cashInHands.service';
import { GlobalCompanyService } from './../../../shared/globalServices/oneCallvariables.servce';

declare var $: any;

@Component({
  selector: 'app-cash-in-hands',
  templateUrl: './cashInHands.component.html',
  styleUrls: ['./cashInHands.component.scss'],
})
export class CashInHandsComponent implements OnInit {
  contentId: String = '';
  public closeResult: string;

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

  public debSum: number;
  public credSum: number;
  public sumTotal: number;
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;

  public breadcrumbs = [];
  public incomingData = [];
  public mainIncomingData = [];
  public ledgerList: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public _cashInHandsService: CashInHandsService,
    public _globalCompanyService: GlobalCompanyService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getLedgerNameData();
    this.getGlobalCompanyData();
  }

  onAccSelect(item: any): void {
    this.csd = null;
    this.ced = null;
    if (item === 'All') {
      // this.getAllIncomingData();
    } else {
      this.getIncomingData(item);
    }
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      this.ownerName = params.owner;
    });
    this.breadcrumbs = [
      { name: 'Ledger' },
      {
        name: 'Dashboard',
        link: `/${this.ownerName}/${this.paramId}/dashboard`,
      },
    ];
  }

  getLedgerNameData() {
    this.dataCopy = this._cashInHandsService
      .getLedgerNameData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.ledgerList = this.ledgerList.concat(data.ledgerData);
      });
  }

  getIncomingData(value) {
    this.dataCopy = this._cashInHandsService
      .getIncomingData(value, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        // this.incomingData = data.formData;
        this.caseThrough(data.formData);
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
        this.dateFilterRefresh();
      });
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
    const dateReturn = this.dateRangeValidator(value);
    if (dateReturn.allow) {
      this.showEndDateError = false;
      this.choosenEndDate = dateReturn.date;
      this.setDateFilter();
    } else {
      this.showEndDateError = true;
      this.choosenEndDate = this.companyEndingDate;
    }
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
        this.incomingData = [];
        return { allow: false, date: null };
      }
    } else {
      this.incomingData = [];

      return { allow: false, date: null };
    }
  }

  setDateFilter() {
    this.incomingData = this.mainIncomingData.filter(el => {
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

  caseThrough(arg) {
    // console.log(arg);
    this.debSum = 0;
    this.credSum = 0;
    arg.map(el => {
      // console.log(el);
      switch (el.voucherType.toLowerCase()) {
        case 'payment': {
          el.particularsData.map(elm => {
            if (elm.particulars.toLowerCase() !== 'cash') {
              elm['creditAmount'] = elm.amount;
              this.credSum += elm.amount;
              elm['debitAmount'] = 0;
            } else {
              elm['debitAmount'] = elm.amount;
              this.debSum += elm.amount;
              elm['creditAmount'] = 0;
            }
          });
          break;
        }
        case 'receipt': {
          el.particularsData.map(elm => {
            if (elm.particulars.toLowerCase() !== 'cash') {
              elm['debitAmount'] = elm.amount;
              this.debSum += elm.amount;
              elm['creditAmount'] = 0;
            } else {
              elm['creditAmount'] = elm.amount;
              this.credSum += elm.amount;
              elm['debitAmount'] = 0;
            }
          });
          break;
        }
        case 'contra': {
          el.particularsData.map(elm => {
            console.log(elm);
            if (elm.particulars.toLowerCase() !== 'cash') {
              elm['debitAmount'] = elm.amount;
              this.debSum += elm.amount;
              elm['creditAmount'] = 0;
            } else {
              elm['creditAmount'] = elm.amount;
              this.credSum += elm.amount;
              elm['debitAmount'] = 0;
            }
          });
          break;
        }
      }
    });
    this.sumTotal = Math.abs(this.debSum - this.credSum);
    this.incomingData = arg;
    this.mainIncomingData = arg;
    console.log(this.incomingData);
  }

  editData(id) {
    this.contentId = id;
    this._cashInHandsService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
