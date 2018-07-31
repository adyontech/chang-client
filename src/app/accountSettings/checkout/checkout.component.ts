import { Component, HostListener, Input, ViewChild, OnInit } from '@angular/core';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../utilities/toastr.service';

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
  public disableClick: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    public _checkoutService: CheckoutService,
    public fb: FormBuilder,
    private router: Router,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.fetchDetails();
    this.validPack();
  }
  validPack() {
    if (this.packName !== 'growth' && this.packName !== 'booster') {
      this.router.navigate(['/settings/upgrade']);
    }
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
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
    // this.disableClick = true;
    if (this.packName === 'growth' || this.packName === 'booster') {
      alertFunctions.SaveData().then(datsa => {
        if (datsa) {
          this._checkoutService.requestPayment(this.packName).subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess('success', 'Request successful redirecting to payment gateway.');
              window.open(data.longUrl, '_blank');
              setTimeout(() => {
                // this.router.navigate(['/gateway']);
              }, 5000);
            } else {
              this._toastrService.typeError('Error', data.message);
              this.disableClick = true;
            }
          });
        } else {
          return;
        }
      });
    }
  }
}
