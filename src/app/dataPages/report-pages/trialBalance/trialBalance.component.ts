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
import { TrialBalanceService } from "./service/trialBalance.service";
import { IMyDpOptions } from "mydatepicker";
import { BsModalComponent, BsModalBodyComponent } from "ng2-bs3-modal";
import { log } from "util";

declare var $: any;

@Component({
  selector: "app-trialBalance",
  host: { "(window:keydown)": "hotkeys($event)" },
  templateUrl: "./trialBalance.component.html",
  styleUrls: ["./trialBalance.component.scss"]
})
export class TrialBalanceComponent implements OnInit {
  contentId: string = "";
  public dateFrom: Date;
  public dateTo: Date;

  @ViewChild("modal") modal: BsModalComponent;

  incomingData: Array<string>;
  form: FormGroup;
  debSum: Number;
  credSum: Number;
  public dataCopy: any;
  public paramId: string;
  public closeResult: string;

  constructor(
    private route: ActivatedRoute,
    public _trialBalanceService: TrialBalanceService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getIncomingData();

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

  getIncomingData() {
    this.debSum = 0;
    this.credSum = 0;
    this.dataCopy = this._trialBalanceService
      .getIncomingData()
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.formData;

        data.formData.map(el => {
          this.debSum += el.debitAmount;
          this.credSum += el.creditAmount;
        });
      });
      
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    this._trialBalanceService.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
