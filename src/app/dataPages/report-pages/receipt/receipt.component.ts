import { Component, Input, ViewChild, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from './service/receipt.service';

declare var $: any;

@Component({
  selector: 'app-receipt-report',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  // Models
  closeResult: string;
  editContentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;
  // public dropdFilter: String;

  VColReceiptType: String = 'Receipt Type';
  VColReceiptThrough: String = 'Receipt Through';
  VColChequeNO: String = 'Cheque Number';
  VColAgainst: String = 'Against';

  @Input() public ColReceiptType: Boolean = false;
  public ColReceiptThrough: Boolean = false;
  public ColChequeNO: Boolean = false;
  public ColAgainst: Boolean = false;

  // incomingData: Array<String>;
  form: FormGroup;
  public dataCopy: any;
  public paramId: String;
  public ownerId: string;

  public accountTypeModel = 'All';
  public chooseItem = [
    'Receipt Type',
    'Receipt Through',
    'Cheque Number',
    'Against',
  ];

  public chooseItemBox = [];
  public accountType: Array<string> = ['All', 'Cash', 'Bank'];
  public incomingData: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public _receiptService: ReceiptService,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.getRouteParam();
    this.onAccSelect('All');
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

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      this.ownerId = params.owner;
    });
  }

  onAdd(item: any): void {
    console.log(item);
    switch (item) {
      case this.VColReceiptType:
        this.ColReceiptType = true;
        break;
      case this.VColReceiptThrough:
        this.ColReceiptThrough = true;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = true;
        break;
      case this.VColAgainst:
        this.ColAgainst = true;
        break;
    }
  }

  onRemove(item: any) {
    switch (item.label) {
      case this.VColReceiptType:
        this.ColReceiptType = false;
        break;
      case this.VColReceiptThrough:
        this.ColReceiptThrough = false;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = false;
        break;
      case this.VColAgainst:
        this.ColAgainst = false;
        break;
    }
  }

  onAccSelect(item: any): void {
    console.log(item);
    if (item === 'All') {
      this.getAllIncomingData();
    } else {
      this.getIncomingData(item);
    }
  }

  onSelectAll() {
    // console.log(items);
    this.ColReceiptType = true;
    this.ColReceiptThrough = true;
    this.ColChequeNO = true;
    this.ColAgainst = true;
    this.chooseItemBox = [
      'Receipt Type',
      'Receipt Through',
      'Cheque Number',
      'Against',
    ];
  }

  onDeSelectAll() {
    // console.log(items);
    this.ColReceiptType = false;
    this.ColReceiptThrough = false;
    this.ColChequeNO = false;
    this.ColAgainst = false;
    this.chooseItemBox = [];
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

  getIncomingData(selectionValue) {
    this.dataCopy = this._receiptService
      .getIncomingData(selectionValue, this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.receiptData;
        console.log(data);
      });
  }

  getAllIncomingData() {
    this.dataCopy = this._receiptService
      .getAllIncomingData(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.receiptData;
      });
  }

  deleteEntry(id) {
    console.log(id);
    this._receiptService
      .deleteEntry(id, this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
      });
  }
}
