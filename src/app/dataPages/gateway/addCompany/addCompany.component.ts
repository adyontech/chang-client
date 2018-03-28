import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { GatewayService } from './../service/gateway.service';

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
  logoError: Boolean = false;
  signatureError: Boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public _gatewayService: GatewayService, public fb: FormBuilder, private router: Router) {
    console.log();
  }

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
    if (this.logoError === true || this.signatureError === true) {
      return;
    }
    console.log(user);
    user.pan = user.pan.toUpperCase();
    user.gstin = user.gstin.toUpperCase();
    user.startDate = new Date(user.startDate.year, user.startDate.month, user.startDate.day);
    user.endDate = new Date(user.endDate.year, user.endDate.month, user.endDate.day);

    this._gatewayService.createNewCompany(user).subscribe((data: IData) => {
      if (data.success) {
        this.router.navigate(['/app/login']);
      }
      console.log(data);
    });
  }

  // this.form.controls[fileField].setErrors({ incorrect: true });
  onFileChange(event, fileField) {
    fileField === 'logo' ? (this.logoError = false) : (this.signatureError = false);
    // console.log(event.target.files);
    const reader = new FileReader();
    if (event.target.files[0].size < 400000) {
      if (event.target.files && event.target.files.length > 0) {
        // console.log(event.target.files);
        // const file = event.target.files[0];
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //   this.form.get(fileField).setValue({
        //     filename: file.name,
        //     filetype: file.type,
        //     value: reader.result.split(',')[1],
        //   });
        // };
        this.form.get(fileField).setValue(event.target.files[0]);
      }
    } else {
      fileField === 'logo' ? (this.logoError = true) : (this.signatureError = true);
    }
  }
}

interface IData {
  success: boolean;
  message: string;
}

