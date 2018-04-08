import { Component, HostListener, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ConfirmService } from './service/confirm.service';
declare var $: any;

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  paymentId: String;
  paymentRequest: String;
  // closeResult: string;
  // public form: FormGroup;
  // public selectedIndex = 1;
  // public dataCopy: any;
  // public paramId: string;
  // public totalAmount: number;
  // public ledgerList: Array<string> = [];
  // public accountList: Array<string> = [];
  // public attachmentError: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public _paymentService: ConfirmService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getRouteParam();
  }
  getRouteParam() {
    this.route.queryParams.subscribe(params => {
      // console.log(params.id);
      console.log(params);
      this.paymentId = params.payment_id;
      this.paymentRequest = params.payment_request_id;
      this.confirmPayment();
      //   this.paramId = 'params.id';
    });
  }
  confirmPayment() {
    this._paymentService.confirmPayment(this.paymentId, this.paymentRequest).subscribe(data => {
      // data = data.json();
    });
  }

}
