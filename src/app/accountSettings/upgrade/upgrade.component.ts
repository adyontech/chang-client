import { Component, HostListener, Input, ViewChild, OnInit } from '@angular/core';
import * as alertFunctions from './../../shared/data/sweet-alerts';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UpgradeService } from './service/upgrade.service';
declare var $: any;
@Component({
  selector: 'app-upgrade-profile',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeProfileComponent implements OnInit {
  public form: FormGroup;
  public paramId: string;
  constructor(
    private route: ActivatedRoute,
    public _paymentService: UpgradeService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // $.getScript('./assets/js/jquery.steps.min.js');
    // $.getScript('./assets/js/wizard-steps.js');
    // this.getRouteParam();
    // this.form = this.fb.group({
    //   purpose: [''],
    //   amount: [''],
    //   buyer: [''],
    //   phone: [''],
    //   email: ['']
    // });
  }
  // get formData() {
  //   return <FormArray>this.form.get('particularsData');
  // }
  // getRouteParam() {
  //   this.route.params.subscribe(params => {
  //     // console.log(params.id);
  //     this.paramId = params.id;
  //     this._paymentService.setParamId(this.paramId);
  //   });
  // }
  requestPayment(packName) {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        console.log(packName);
        this._paymentService.requestPayment(packName).subscribe(data => {});
      } else {
        return;
      }
    });
  }
}
