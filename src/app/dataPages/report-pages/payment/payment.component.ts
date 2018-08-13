import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './service/payment.service';
import { GlobalCompanyService } from '../../../shared/globalServices/oneCallvariables.servce';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  // Models
  public closeResult: string;
  public editContentId: String = '';

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

  // Modal for column hide and show

  VColPaymentType: String = 'Payment Type';
  VColPaymentThrough: String = 'Payment Through';
  VColChequeNO: String = 'Cheque Number';
  VColAgainst: String = 'Against';

  @Input()
  public ColPaymentType: Boolean = false;
  public ColPaymentThrough: Boolean = false;
  public ColChequeNO: Boolean = false;
  public ColAgainst: Boolean = false;

  public dataCopy: any;
  public paramId: string;
  public ownerName: string;

  public accountTypeModel = 'All';
  public chooseItem = [
    'Payment Type',
    'Payment Through',
    'Cheque Number',
    'Against',
  ];

  public accountType: Array<string> = ['All', 'Cash', 'Bank'];
  public chooseItemBox = [];
  public mainIncomingData = [];
  public incomingData = [];

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public _paymentService: PaymentService,
    public _globalCompanyService: GlobalCompanyService
  ) {}
  ngOnInit() {
    this.getRouteParam();
    this.getIncomingData('All');
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

  // This function is used in open
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
      case this.VColPaymentType:
        this.ColPaymentType = true;
        break;
      case this.VColPaymentThrough:
        this.ColPaymentThrough = true;
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
      case this.VColPaymentType:
        this.ColPaymentType = false;
        break;
      case this.VColPaymentThrough:
        this.ColPaymentThrough = false;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = false;
        break;
      case this.VColAgainst:
        this.ColAgainst = false;
        break;
    }
  }

  onSelectAll() {
    this.ColPaymentType = true;
    this.ColPaymentThrough = true;
    this.ColChequeNO = true;
    this.ColAgainst = true;
    this.chooseItemBox = [
      'Payment Type',
      'Payment Through',
      'Cheque Number',
      'Against',
    ];
  }

  onDeSelectAll() {
    this.ColPaymentType = false;
    this.ColPaymentThrough = false;
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

  // real date picker active from here
  getIncomingData(selectionValue) {
    this.csd = null;
    this.ced = null;
    this.dataCopy = this._paymentService
      .getIncomingData(selectionValue, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.paymentData;
        this.mainIncomingData = data.paymentData;
      });
  }

  deleteEntry(id) {
    this._paymentService
      .deleteEntry(id, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {});
  }
}
