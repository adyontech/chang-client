import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { GatewayService } from './../service/gateway.service';
import { ToastrService } from './../../../utilities/toastr.service';
@Component({
  selector: 'app-add-company',
  templateUrl: './addCompany.component.html',
  styleUrls: ['./addCompany.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  d2: any;
  form: FormGroup;
  allowClick: Boolean = true;
  email: string;

  imageFile: string;
  image_view: Boolean = false;
  logoError: Boolean = false;
  signatureError: Boolean = false;

  sigFileName: String = 'No File Choosen.';
  logoFileName: String = 'No File Choosen.';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    public _gatewayService: GatewayService,
    public fb: FormBuilder,
    private router: Router,
    public _toastrService: ToastrService
  ) {
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
    this._toastrService.typeWarning('Processing the data');
    if (this.logoError === true || this.signatureError === true) {
      return;
    }
    console.log(user);
    user.pan = user.pan.toLowerCase();
    user.gstin = user.gstin.toLowerCase();
    user.startDate = new Date(user.startDate.year, user.startDate.month, user.startDate.day);
    user.endDate = new Date(user.endDate.year, user.endDate.month, user.endDate.day);

    this._gatewayService.createNewCompany(user).subscribe((data: IData) => {
      this.allowClick = false;
      if (data.success) {
        this._toastrService.typeSuccess('success', 'Data successfully added');
        this._toastrService.typeInfo('Redirecting to Gateway page', 'Info');
        this.router.navigate(['/gateway']);
      } else {
        this._toastrService.typeError('Error', data.message);
      }
      console.log(data);
    });
  }

  // this.form.controls[fileField].setErrors({ incorrect: true });
  onFileChange(event, fileField) {
    fileField === 'logo' ? (this.logoError = false) : (this.signatureError = false);
    // console.log(event.target.files);
    const reader = new FileReader();
    if (event.target.files[0].size < 200000) {
      if (event.target.files && event.target.files.length > 0) {
        this.form.get(fileField).setValue(event.target.files[0]);
        // console.log(event.target.files[0].name);
        fileField === 'logo'
          ? (this.logoFileName = event.target.files[0].name)
          : (this.sigFileName = event.target.files[0].name);
      }
    } else {
      if (fileField === 'logo') {
        this.logoError = true;
        this.sigFileName = 'No File choosen'
      } else {
        this.signatureError = true;
        this.logoFileName = 'No File choosen'
      }
    }
  }
}

interface IData {
  success: boolean;
  message: string;
}
