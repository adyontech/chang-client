import { Component, Input, ViewChild, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { ActivatedRoute } from "@angular/router";
import { CashInHandsService } from "./service/cashInHands.service";
import { IMyDpOptions } from "mydatepicker";
import { BsModalComponent, BsModalBodyComponent } from "ng2-bs3-modal";

declare var $: any;

@Component({
  selector: "app-cashInHands",
  host: { "(window:keydown)": "hotkeys($event)" },
  templateUrl: "./cashInHands.component.html",
  styleUrls: ["./cashInHands.component.scss"]
})
export class CashInHandsComponent implements OnInit {
  contentId: string = "";
  public dateFrom: Date;
  public dateTo: Date;

  @ViewChild("modal") modal: BsModalComponent;

  debSum: number;
  credSum: number;
  sumTotal: number;
  incomingData: Array<string>;
  form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public closeResult: string;
  public ledgerList: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public _cashInHandsService: CashInHandsService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getLedgerNameData();

    this.modal.onClose.subscribe(this.onClose.bind(this));
  }

  hotkeys(event) {
    if (event.keyCode == 76 && event.ctrlKey) {
      this.modal.open();
    }
  }

  onClose() {
    console.log("Modal Closed");
    this.contentId = "";
  }
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: "dd.mm.yyyy"
  };

  public value: any = {};
  public _disabledV: string = "0";
  public disabled: boolean = false;
  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === "1";
  }

  public selected(value: any): void {
    this.getIncomingData(value.id);
  }

  public removed(value: any): void {
    console.log("Removed value is: ", value);
  }

  // public typed(value: any): void {
  //     console.log('New search input: ', value);
  // }

  public refreshValue(value: any): void {
    this.value = value;
  }

  getLedgerNameData() {
    this.dataCopy = this._cashInHandsService
      .getLedgerNameData()
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);

        this.getIncomingData(this.ledgerList[0]);
      });
  }
  getIncomingData(value) {
    this.dataCopy = this._cashInHandsService
      .getIncomingData(value)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data);
        this.caseThrough(data.formData);
      });
  }

  caseThrough(arg) {
    this.debSum = 0;
    this.credSum = 0;
    // console.log(arg);
    arg.map(el => {
      switch (el.source.toLowerCase()) {
        case "payment": {
          el.data.map(elm =>
            elm.particularsData.map(ele => {
              if (elm.account.toLowerCase() == "cash") {
                ele["creditAmount"] = ele.amount;
                this.credSum += ele.amount;
                ele["debitAmount"] = 0;
              } else {
                ele["debitAmount"] = ele.amount;
                this.debSum += ele.amount;
                ele["creditAmount"] = 0;
              }
            })
          );
          break;
        }
        case "receipt": {
          el.data.map(elm =>
            elm.particularsData.map(ele => {
              if (elm.account.toLowerCase() == "cash") {
                ele["debitAmount"] = ele.amount;
                this.debSum += ele.amount;
                ele["creditAmount"] = 0;
              } else {
                ele["creditAmount"] = ele.amount;
                this.credSum += ele.amount;
                ele["debitAmount"] = 0;
              }
            })
          );
          break;
        }
        case "conta": {
          el.data.map(elm =>
            elm.particularsData.map(ele => {
              if (elm.account.toLowerCase() == "cash") {
                ele["debitAmount"] = ele.amount;
                this.debSum += ele.amount;
                ele["creditAmount"] = 0;
              } else {
                ele["creditAmount"] = ele.amount;
                this.credSum += ele.amount;
                ele["debitAmount"] = 0;
              }
            })
          );
          break;
        }
      }
    });

    console.log(arg);
    this.sumTotal = Math.abs(this.debSum - this.credSum);
    this.incomingData = arg.map(el => el.data)[0];
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    this._cashInHandsService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
