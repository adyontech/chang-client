import { GatewayService } from './../service/gateway.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-company',
  templateUrl: './addCompany.component.html',
  styleUrls: ['./addCompany.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  d2: any;
  form: FormGroup;

  email: string;

  imageFile: string;
  image_view: Boolean = false;

  constructor(public _gatewayService: GatewayService, public fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      companyName: [
        '',
        //  Validators.compose([Validators.minLength(6),
        // NameValidator.isValid])
      ],

      pan: [''],

      address: [''],

      city: [''],

      state: [''],

      gstin: [''],

      phoneNo: [''],

      language: [''],

      email: [''],

      natureOfBuisness: [''],

      NatureOfPackage: [''],

      currency: [''],

      startDate: [''],

      endDate: [''],

      logo: [''],

      signature: [''],
    });
  }

  onSubmit(user) {
    console.log(user);
    user.pan = user.pan.toUpperCase();
    user.gstin = user.gstin.toUpperCase();
    user.startDate = new Date(user.startDate.year, user.startDate.month, user.startDate.day);
    user.endDate = new Date(user.endDate.year, user.endDate.month, user.endDate.day);
    user.logo = this.imageFile;
    user.logo = 'https://lorempixel.com/400/200/';

    this._gatewayService.createNewCompany(user).subscribe(data => {
      // console.log('hello gateway service')
    });
  }
}
