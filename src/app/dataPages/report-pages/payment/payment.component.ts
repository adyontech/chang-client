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
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './service/payment.service';
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  // Models
  closeResult: string;
  editContentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;

  // Modal for column hide and show

  VColPaymentType: String = 'Payment Type';
  VColPaymentThrough: String = 'Payment Through';
  VColChequeNO: String = 'Cheque Number';
  VColAgainst: String = 'Against';

  @Input() public ColPaymentType: Boolean = false;
  public ColPaymentThrough: Boolean = false;
  public ColChequeNO: Boolean = false;
  public ColAgainst: Boolean = false;

  form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public ownerId: string;

  public accountTypeModel = 'All';
  public chooseItem = [
    'Payment Type',
    'Payment Through',
    'Cheque Number',
    'Against',
  ];
  public chooseItemBox = [];
  public accountType: Array<string> = ['All', 'Cash', 'Bank'];
  public incomingData: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public _paymentService: PaymentService
  ) {}
  ngOnInit() {
    this.getRouteParam();
    this.onAccSelect('All');
  }

  // This function is used in open
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
    // console.log(item)
    // console.log(item === this.VColPaymentType);
    // console.log(this.VColAgainst);
    switch (item) {
      case this.VColPaymentType:
        this.ColPaymentType = true;
        break;
      case this.VColPaymentThrough:
        this.ColPaymentThrough = true;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = true;
        break;
      case this.VColAgainst:
        this.ColAgainst = true;
        break;
    }
  }

  onAccSelect(item: any): void {
    console.log(item);
    if (item === 'All') {
      this.getAllIncomingData(this.paramId);
    } else {
      this.getIncomingData(item, this.paramId);
    }
  }

  onRemove(item: any) {
    switch (item.label) {
      case this.VColPaymentType:
        this.ColPaymentType = false;
        break;
      case this.VColPaymentThrough:
        this.ColPaymentThrough = false;
        break;
      case this.VColChequeNO:
        this.ColChequeNO = false;
        break;
      case this.VColAgainst:
        this.ColAgainst = false;
        break;
    }
  }

  onSelectAll() {
    // console.log(items);
    this.ColPaymentType = true;
    this.ColPaymentThrough = true;
    this.ColChequeNO = true;
    this.ColAgainst = true;
    this.chooseItemBox = [
      'Payment Type',
      'Payment Through',
      'Cheque Number',
      'Against',
    ];
  }

  onDeSelectAll() {
    // console.log(items);
    this.ColPaymentType = false;
    this.ColPaymentThrough = false;
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

  // real date picker active from here
  getIncomingData(selectionValue, compaName) {
    this.dataCopy = this._paymentService
      .getIncomingData(selectionValue, compaName, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.paymentData;
        console.log(this.incomingData);
      });
  }

  getAllIncomingData(compName) {
    this.dataCopy = this._paymentService
      .getAllIncomingData(compName, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.paymentData;
      });
  }

  deleteEntry(id) {
    console.log(id);
    this._paymentService
      .deleteEntry(id, this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
      });
  }
}
