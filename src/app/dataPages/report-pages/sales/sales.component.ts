import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from './service/sales.service';
import { GlobalCompanyService } from './../../../shared/globalServices/oneCallvariables.servce';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  // Models
  public contentId: String = '';
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

  VColTransportationMode: String = 'Transportation Mode';
  VColSaleType: String = 'Type of sale';
  VColSupplyPlace: String = 'Place of supply';
  VColVehicleNo: String = 'Vehicle No';
  // VColGstRate: String = "ColGstRate";

  @Input() public ColTransportationMode: Boolean = false;
  public ColSaleType: Boolean = false;
  public ColSupplyPlace: Boolean = false;
  public ColVehicleNo: Boolean = false;
  // public ColGstRate: Boolean = false;

  public dataCopy: any;
  public paramId: String;
  public ownerName: string;
  public closeResult: String;

  public accountType: Array<string> = ['All', 'Cash', 'Bank'];
  public chooseItemBox = [];
  public mainIncomingData = [];
  public incomingData = [];
  public chooseItem = [
    'Transportation Mode',
    'Type of sale',
    'Place of supply',
    'Vehicle No',
  ];

  constructor(
    private route: ActivatedRoute,
    public _salesService: SalesService,
    private modalService: NgbModal,
    public _globalCompanyService: GlobalCompanyService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getIncomingData();
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
      case this.VColTransportationMode:
        this.ColTransportationMode = true;
        break;
      case this.VColSaleType:
        this.ColSaleType = true;
        break;
      case this.VColSupplyPlace:
        this.ColSupplyPlace = true;
        break;
      case this.VColVehicleNo:
        this.ColVehicleNo = true;
        break;
      // case this.VColGstRate:
      //     this.ColGstRate = true;
      //     break;
    }
  }

  onRemove(item: any) {
    switch (item.label) {
      case this.VColTransportationMode:
        this.ColTransportationMode = false;
        break;
      case this.VColSaleType:
        this.ColSaleType = false;
        break;
      case this.VColSupplyPlace:
        this.ColSupplyPlace = false;
        break;
      case this.VColVehicleNo:
        this.ColVehicleNo = false;
        break;
      // case this.VColGstRate:
      //     this.ColGstRate = false;
      //     break;
    }
  }
  onSelectAll() {
    this.ColTransportationMode = true;
    this.ColSaleType = true;
    this.ColSupplyPlace = true;
    this.ColVehicleNo = true;
    // this.ColGstRate = true;
    this.chooseItemBox = [
      'Payment Type',
      'Payment Through',
      'Cheque Number',
      'Against',
    ];
  }

  onDeSelectAll() {
    this.ColTransportationMode = false;
    this.ColSaleType = false;
    this.ColSupplyPlace = false;
    this.ColVehicleNo = false;
    // this.ColGstRate = false;
  }

  open(content, editId) {
    this.editContentId = editId;
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  onClose() {
    this.contentId = '';
  }

  getIncomingData() {
    this.dataCopy = this._salesService
      .getIncomingData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.salesData;
      });
  }

  deleteEntry(id) {
    this._salesService
      .deleteEntry(id, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {});
  }
}
