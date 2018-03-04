import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { ContraService } from './service/contra.service';

@Component({
  selector: 'app-contra',
  templateUrl: './contra.component.html',
  styleUrls: ['./contra.component.scss'],
})
export class ContraComponent implements OnInit {
  contentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;

  incomingData: Array<string>;
  form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public closeResult: string;

  constructor(private route: ActivatedRoute, public _contraService: ContraService, public fb: FormBuilder) {}

  ngOnInit() {
    this.getRouteParam();
    this.getIncomingData();
  }

  //   hotkeys(event) {
  //     if (event.keyCode == 76 && event.ctrlKey) {
  //       this.modal.open();
  //     }
  //   }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      //   this._cashAtBankService.setParamId(this.paramId)
    });
  }
  getIncomingData() {
    this.dataCopy = this._contraService
      .getIncomingData(this.paramId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data.contraData);
        this.incomingData = data.contraData;
      });
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
  }

  deleteData(id) {}

  copyData(id) {}
}
