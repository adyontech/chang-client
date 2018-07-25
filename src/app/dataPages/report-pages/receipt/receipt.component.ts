import { Component, Input, ViewChild, OnInit } from '@angular/core';

import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from './service/receipt.service';
import { GlobalCompanyService } from './../../../shared/globalServices/oneCallvariables.servce';


@Component({
  selector: 'app-receipt-report',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  // Models
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

  VColReceiptType: String = 'Receipt Type';
  VColReceiptThrough: String = 'Receipt Through';
  VColChequeNO: String = 'Cheque Number';
  VColAgainst: String = 'Against';

  @Input() public ColReceiptType: Boolean = false;
  public ColReceiptThrough: Boolean = false;
  public ColChequeNO: Boolean = false;
  public ColAgainst: Boolean = false;

  public dataCopy: any;
  public paramId: String;
  public ownerName: string;

  public accountTypeModel = 'All';
  public chooseItem = [
    'Receipt Type',
    'Receipt Through',
    'Cheque Number',
    'Against',
  ];

  public chooseItemBox = [];
  public accountType: Array<string> = ['All', 'Cash', 'Bank'];
    public mainIncomingData = [];
    public incomingData: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public _receiptService: ReceiptService,
    private modalService: NgbModal,
    public _globalCompanyService: GlobalCompanyService
  ) {}
  ngOnInit() {
    this.getRouteParam();
    this.onAccSelect('All');
    this.getGlobalCompanyData();
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

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id;
      this.ownerName = params.owner;
    });
  }

  onAdd(item: any): void {
    switch (item) {
      case this.VColReceiptType:
        this.ColReceiptType = true;
        break;
      case this.VColReceiptThrough:
        this.ColReceiptThrough = true;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = true;
        break;
      case this.VColAgainst:
        this.ColAgainst = true;
        break;
    }
  }

  onRemove(item: any) {
    switch (item.label) {
      case this.VColReceiptType:
        this.ColReceiptType = false;
        break;
      case this.VColReceiptThrough:
        this.ColReceiptThrough = false;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = false;
        break;
      case this.VColAgainst:
        this.ColAgainst = false;
        break;
    }
  }

  onAccSelect(item: any): void {
    if (item === 'All') {
      this.getAllIncomingData();
    } else {
      this.getIncomingData(item);
    }
  }

  onSelectAll() {
    this.ColReceiptType = true;
    this.ColReceiptThrough = true;
    this.ColChequeNO = true;
    this.ColAgainst = true;
    this.chooseItemBox = [
      'Receipt Type',
      'Receipt Through',
      'Cheque Number',
      'Against',
    ];
  }

  onDeSelectAll() {
    this.ColReceiptType = false;
    this.ColReceiptThrough = false;
    this.ColChequeNO = false;
    this.ColAgainst = false;
    this.chooseItemBox = [];
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
    this.dataCopy = this._receiptService
      .getIncomingData(selectionValue, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.incomingData = data.receiptData;
        this.mainIncomingData = data.receiptData;
      });
  }

  getAllIncomingData() {
    this.dataCopy = this._receiptService
      .getAllIncomingData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        this.mainIncomingData = data.receiptData;
        this.incomingData = data.receiptData;
      });
  }

  deleteEntry(id) {
    this._receiptService
      .deleteEntry(id, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
      });
  }
}
