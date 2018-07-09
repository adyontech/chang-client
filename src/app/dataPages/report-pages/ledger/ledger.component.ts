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

declare var $: any;

@Component({
  selector: 'app-ledger-out',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent implements OnInit {
  // Models
  boxHidden: Boolean = false;
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

  LedgerData: Array<string>;
  form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public closeResult: string;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  public items: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public _ledgerService: LedgerService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getLedgerNames();
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  public onAdd(value: any): void {
    this._ledgerService.ledgerName = value;
    this.dataCopy = this._ledgerService
      .getIncomingData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        data.formData.length === 0
          ? (this.haveData = true)
          : (this.haveData = null);
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
        console.log(data);
        if (data.success === true) {
          this.defaultLedgerSelect = data.ledgerData[0];
          this.items = this.items.concat(data.ledgerData);
          this.onAdd(this.defaultLedgerSelect);
        }
      });
  }

  startDate(value) {
    this.startingDate = value;
  }
  endDate(value) {
    this.endingDate = value;
  }

  deleteEntry(entryId) {}
}
