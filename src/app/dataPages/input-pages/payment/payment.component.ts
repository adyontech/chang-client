import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './service/payment.service';
// import { IMyDpOptions } from 'mydatepicker';
// import { BsModalComponent, BsModalBodyComponent } from 'ng2-bs3-modal';
import { InputFormService } from './../service/input-pages.service';
declare var $: any;

@Component({
  selector: 'app-payment',
  // host: { '(window:keydown)': 'hotkeys($event)' },
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  constructor(private _inputFormService: InputFormService) {}
}
