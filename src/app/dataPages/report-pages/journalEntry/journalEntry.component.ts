import { Component, Input, ViewChild, OnInit } from '@angular/core';

import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { JournalEntryService } from './service/journalEntry.service';
import { GlobalCompanyService } from '../../../shared/globalServices/oneCallvariables.servce';

declare var $: any;

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journalEntry.component.html',
  styleUrls: ['./journalEntry.component.scss'],
})
export class JournalEntryComponent implements OnInit {
  closeResult: string;
  editContentId: String = '';

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

  public mainIncomingData = [];
  public incomingData = [];
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;

  public accountTypeModel = 'All';
  public accountType: Array<string> = ['All', 'Dr', 'Cr'];

  constructor(
    private route: ActivatedRoute,
    public _journalEntryService: JournalEntryService,
    private modalService: NgbModal,
    public _globalCompanyService: GlobalCompanyService
  ) {}
  ngOnInit() {
    this.getRouteParam();
    this.onAccSelect('All');
    this.getGlobalCompanyData();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      this.ownerName = params.owner;
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onAccSelect(item: any): void {
    if (item === 'All') {
      this.getAllIncomingData();
    } else {
      // type Activity = typeof Mydata;
      this.getIncomingData(item);
    }
  }
  open(content, editId) {
    this.editContentId = editId;
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getIncomingData(selectionValue) {
    this.dataCopy = this._journalEntryService
      .getIncomingData(selectionValue, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.incomingData = data.journalData;
        this.mainIncomingData = data.journalData;
        this.onAccSelect('All');
      });
  }

  getAllIncomingData() {
    this.dataCopy = this._journalEntryService
      .getAllIncomingData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.journalData;
        this.mainIncomingData = data.journalData;
      });
  }

  deleteEntry(id) {
    this._journalEntryService
      .deleteEntry(id, this.paramId)
      // .map(response => response.json())
      .subscribe(data => {});
  }
}
interface MyData {
  commonJournalModel: string;
  date: string;
  deleteLedgerID: any;
  file: string;
  journalNumber: string;
  narration: string;
  particularsData: any;
  voucherModelName: string;
}
