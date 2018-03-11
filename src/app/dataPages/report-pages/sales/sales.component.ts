import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { SalesService } from './service/sales.service';

declare var $: any;

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  // Models
  contentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;
  public dropdFilter: String;


  VColTransportationMode: String = 'ColTransportationMode';
  VColSaleType: String = 'ColSaleType';
  VColSupplyPlace: String = 'ColSupplyPlace';
  VColVehicleNo: String = 'ColVehicleNo';
  // VColGstRate: String = "ColGstRate";

  @Input() public ColTransportationMode: Boolean = false;
  public ColSaleType: Boolean = false;
  public ColSupplyPlace: Boolean = false;
  public ColVehicleNo: Boolean = false;
  // public ColGstRate: Boolean = false;

  incomingData: Array<String>;
  form: FormGroup;
  public dataCopy: any;
  public paramId: String;
  public closeResult: String;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private route: ActivatedRoute, public _salesService: SalesService, public fb: FormBuilder) {}

  ngOnInit() {
    this.getIncomingData();
    this.dropdownList = [
      { id: 'ColTransportationMode', itemName: 'Transportation mode' },
      { id: 'ColSaleType', itemName: 'Sale type' },
      { id: 'ColSupplyPlace', itemName: 'Supply Place' },
      { id: 'ColVehicleNo', itemName: 'Vehicle No' },
      // { "id": "ColGstRate", "itemName": "Gst rate" },
    ];

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select filter',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: 'myclass custom-class',
    };
  }

  onItemSelect(item: any): void {
    switch (item.id) {
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
    console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    switch (item.id) {
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
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    // console.log(items);
    this.ColTransportationMode = true;
    this.ColSaleType = true;
    this.ColSupplyPlace = true;
    this.ColVehicleNo = true;
    // this.ColGstRate = true;
  }
  onDeSelectAll(items: any) {
    // console.log(items);
    this.ColTransportationMode = false;
    this.ColSaleType = false;
    this.ColSupplyPlace = false;
    this.ColVehicleNo = false;
    // this.ColGstRate = false;
  }
  onClose() {
    console.log('Modal Closed');
    this.contentId = '';
  }

  getIncomingData() {
    this.dataCopy = this._salesService
      .getIncomingData()
      .map(response => response.json())
      .subscribe(data => {
        this.incomingData = data.salesData;
        console.log(this.incomingData);
      });
  }

  editData(id) {
    console.log(id);
    this.contentId = id;
    this._salesService.contentId = id;
  }
}
