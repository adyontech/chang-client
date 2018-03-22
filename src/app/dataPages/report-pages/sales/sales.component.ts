import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  editContentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;
  public dropdFilter: String;

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

  form: FormGroup;
  public dataCopy: any;
  public paramId: String;
  public closeResult: String;
  incomingData: Array<String>;
  chooseItem = ['Transportation Mode', 'Type of sale', 'Place of supply', 'Vehicle No'];
  chooseItemBox = [];

  constructor(private route: ActivatedRoute, public _salesService: SalesService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getRouteParam();
    this.getIncomingData(this.paramId);
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
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
    // console.log(items);
    this.ColTransportationMode = true;
    this.ColSaleType = true;
    this.ColSupplyPlace = true;
    this.ColVehicleNo = true;
    // this.ColGstRate = true;
    this.chooseItemBox = ['Payment Type', 'Payment Through', 'Cheque Number', 'Against'];
  }
  onDeSelectAll() {
    // console.log(items);
    this.ColTransportationMode = false;
    this.ColSaleType = false;
    this.ColSupplyPlace = false;
    this.ColVehicleNo = false;
    // this.ColGstRate = false;
  }

  open(content, editId) {
    this.editContentId = editId;
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  onClose() {
    console.log('Modal Closed');
    this.contentId = '';
  }

  getIncomingData(compName) {
    this.dataCopy = this._salesService
      .getIncomingData(compName)
      .map(response => response.json())
      .subscribe(data => {
        this.incomingData = data.salesData;
        console.log(this.incomingData);
      });
  }

  deleteEntry(id) {
    console.log(id);
    // this._salesService
    //   .deleteEntry(id, this.paramId)
    //   .map(response => response.json())
    //   .subscribe(data => {
    //     console.log(data);
    //   });
  }
}
