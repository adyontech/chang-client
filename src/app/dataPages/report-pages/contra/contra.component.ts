import { Component, Input, ViewChild, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { ContraService } from './service/contra.service';
import { GlobalCompanyService } from './../../../shared/globalServices/oneCallvariables.servce';


@Component({
  selector: 'app-contra',
  templateUrl: './contra.component.html',
  styleUrls: ['./contra.component.scss'],
})
export class ContraComponent implements OnInit {
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
    public incomingData: Array<string> = [];

  public dataCopy: any;
  public paramId: string;
  public ownerName: string;

  public accountTypeModel = 'All';
  public accountType: Array<string> = ['All', 'Cash', 'Bank'];

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public _contraService: ContraService,   public _globalCompanyService: GlobalCompanyService
 
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.onAccSelect('All');
    this.getGlobalCompanyData();
  }

getRouteParam() {
    this.route.params.subscribe(params => {
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
      this.getAllIncomingData(this.paramId);
    } else {
      this.getIncomingData(item, this.paramId);
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

  getIncomingData(selectionValue, compaName) {
    this.dataCopy = this._contraService
      .getIncomingData(selectionValue, compaName)
      .map(response => response.json())
      .subscribe(data => {
        this.mainIncomingData = data.contraData;
        this.incomingData = data.contraData;
      });
  }

  getAllIncomingData(compName) {
    this.dataCopy = this._contraService
      .getAllIncomingData(compName)
      .map(response => response.json())
      .subscribe(data => {
        this.mainIncomingData = data.contraData;
        this.incomingData = data.contraData;
      });
  }

  deleteEntry(id) {
    this._contraService
      .deleteEntry(id, this.paramId)
      // .map(response => response.json())
      .subscribe(data => {});
  }
}
