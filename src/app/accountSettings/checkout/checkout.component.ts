import { Component, HostListener, Input, ViewChild, OnInit } from '@angular/core';
import * as alertFunctions from './../../shared/data/sweet-alerts';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from './service/checkout.service';
declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  // public form: FormGroup;
  public profileUpdated;
  public user: any;
  public packName: string;
  constructor(
    private route: ActivatedRoute,
    public _checkoutService: CheckoutService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.fetchDetails();
    this.vaidPack();
  }
  vaidPack() {
    if (this.packName !== 'growth' && this.packName !== 'booster') {
      this.router.navigate(['/settings/upgrade']);
    }
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      console.log(params.pack);
      this.packName = params.pack;
    });
  }

  fetchDetails() {
    this._checkoutService.fetchDetails().subscribe(res => {
      this.profileUpdated = res.json().user.profileUpdated;
      // if (!this.profileUpdated) {
      //   alertFunctions.basicAlert('First complete your profile :)');
      //   setTimeout(() => {
      //       this.router.navigate(['/settings/edit']);
      //     }, 3000);
      //   }
    });
  }
  requestPayment() {
    if (this.packName === 'growth' || this.packName === 'booster') {
      alertFunctions.SaveData().then(datsa => {
        if (datsa) {
          console.log(this.packName);
          this._checkoutService.requestPayment(this.packName).subscribe(data => {});
        } else {
          return;
        }
      });
    }
  }
}
