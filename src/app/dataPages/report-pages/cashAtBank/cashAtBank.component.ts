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
import { CashAtBankService } from "./service/cashAtBank.service";
import { IMyDpOptions } from "mydatepicker";
import { BsModalComponent, BsModalBodyComponent } from "ng2-bs3-modal";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: "app-cashAtBank",
  host: { "(window:keydown)": "hotkeys($event)" },
  templateUrl: "./cashAtBank.component.html",
  styleUrls: ["./cashAtBank.component.scss"]
})
export class CashAtBankComponent implements OnInit {
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
    public _cashAtBankService: CashAtBankService,
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
    this.dataCopy = this._cashAtBankService
      .getLedgerNameData()
      .map(response => response.json())
      .subscribe(data => {
        this.ledgerList = this.ledgerList.concat(data.ledgerData);

        this.getIncomingData(this.ledgerList[0]);
      });
  }
  getIncomingData(value) {
    this.dataCopy = this._cashAtBankService
      .getIncomingData(value)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data);
        this.caseThrough(data.formData);
      });
  }

  caseThrough(arg) {
    // console.log(arg);
    this.debSum = 0;
    this.credSum = 0;
    // console.log(arg);
    arg.map(el => {
      switch (el.source.toLowerCase()) {
        case "payment": {
          //   console.log(el.data)
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
        case "journal": {
          console.log(el)
          for (let i = 0; i < el.data.particularsData.length; i++) {
            var check = this.ledgerList.includes(
              el.data.particularsData[i].particulars[0].id
            );
            if (!check)  {

              var v1 = el.data.particularsData[i].debitAmount;
              var v2 = el.data.particularsData[i].creditAmount;
              v2 = [v1, (v1 = v2)][0];

            }
          }
          el.data = el.data.particularsData;
          break;
        }
      }
    });

    // console.log(arg);
    this.sumTotal = Math.abs(this.debSum - this.credSum);
    // this.incomingData = arg.map(el => el.data)[0];
    // console.log(arg.map(el => el.data));
    this.incomingData = [];
    arg.map(el => (this.incomingData = this.incomingData.concat(el.data)));
    console.log(this.incomingData);
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    this._cashAtBankService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
