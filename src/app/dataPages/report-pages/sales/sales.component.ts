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

  VColTransportationMode: String = 'Transportation mode';
  VColSaleType: String = 'Sale type';
  VColSupplyPlace: String = 'Supply Place';
  VColVehicleNo: String = 'Vehicle No';
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

  chooseItem = ['Transportation mode', 'Sale type', 'Supply Place', 'Vehicle No'];
  chooseItemBox = [];
  selectedItems = [];

  constructor(private route: ActivatedRoute, private modalService: NgbModal, public _salesService: SalesService) {}

  ngOnInit() {
    this.getRouteParam();
  }

  open(content, editId) {
    this.editContentId = editId;
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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
    switch (item.value) {
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
  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
    });
  }

  onSelectAll() {
    // console.log(items);
    this.ColTransportationMode = true;
    this.ColSaleType = true;
    this.ColSupplyPlace = true;
    this.ColVehicleNo = true;
    // this.ColGstRate = true;
  }

  onDeSelectAll() {
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

  // deleteEntry(id) {
  //   console.log(id);
  //   this._salesService
  //     .deleteEntry(id, this.paramId)
  //     .map(response => response.json())
  //     .subscribe(data => {
  //       console.log(data);
  //     });
  // }
}
