import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayService } from './service/editProductService.service';
import { ToastrService } from './../../../utilities/toastr.service';
import { DateValidator } from '../../../shared/validators/dateValidator';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import { StateVaribles } from './../../../shared/forms/States';
import * as alertFunctions from './../../../shared/data/sweet-alerts';

@Component({
  selector: 'app-edit-company',
  templateUrl: './editCompany.component.html',
  styleUrls: ['./editCompany.component.scss'],
})
export class EditCompanyComponent implements OnInit {
  public form: FormGroup;
  public allowClick: Boolean = true;
  public dataCopy: any;
  public companyData: any;
  public paramId: string;
  public ownerName: string;
  public stateList: Array<string>;
  public logoError: Boolean = false;
  public signatureError: Boolean = false;
  public companyDataId: any;

  public sigFileName: String = 'No File Choosen.';
  public logoFileName: String = 'No File Choosen.';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public _gatewayService: GatewayService,
    public fb: FormBuilder,
    private router: Router,
    public _toastrService: ToastrService,
    public _stateVariables: StateVaribles
  ) {
    this.stateList = this._stateVariables.stateListArray;
  }

  ngOnInit() {
    this.getRouteParam();
    this.getCompanyData();
    this.form = this.fb.group({
      companyName: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d- _]+$/),
        Validators.maxLength(20),
      ]),

      pan: new FormControl('', [
        patternValidator(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
      ]),

      address: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d- _]+$/),
        Validators.maxLength(20),
      ]),

      city: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d- _]+$/),
        Validators.maxLength(20),
      ]),

      state: new FormControl('', [Validators.required]),

      gstin: new FormControl('', [
        Validators.required,
        patternValidator(
          /\d{2}[a-zA-Z]{5}\d{4}[a-zA-Z]{1}\d[zZ]{1}[a-zA-Z\d]{1}/
        ),
      ]),

      phoneNo: new FormControl('', [patternValidator(/^[0]?[6789]\d{9}$/)]),

      language: new FormControl('', [Validators.required]),

      email: new FormControl('', [
        Validators.required,
        patternValidator(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),

      natureOfBuisness: [''],

      currency: new FormControl('', [Validators.required]),

      startDate: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
      ),

      endDate: new FormControl(
        '',
        Validators.compose([Validators.required, DateValidator.datevalidator])
      ),

      logo: [''],

      signature: [''],
    });
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }
  getCompanyData() {
    this.dataCopy = this._gatewayService
      .getCompanyData(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        if (data.success !== false) {
          console.log(data);
          this.companyDataId = data.companyData._id;
          this.companyData = data.companyData;
          this.companyData.startDate = new Date(
            parseInt(this.companyData.startDate, 0)
          );
          this.companyData.endDate = new Date(
            parseInt(this.companyData.endDate, 0)
          );
          this.form.controls['companyName'].setValue(
            this.companyData.companyName
          );
          this.form.controls['address'].setValue(this.companyData.address);
          this.form.controls['city'].setValue(this.companyData.city);
          this.form.controls['state'].setValue(this.companyData.state);
          this.form.controls['gstin'].setValue(this.companyData.gstin);
          this.form.controls['phoneNo'].setValue(this.companyData.phoneNo);
          this.form.controls['language'].setValue(this.companyData.language);
          this.form.controls['email'].setValue(this.companyData.email);
          this.form.controls['natureOfBuisness'].setValue(
            this.companyData.natureOfBuisness
          );
          this.form.controls['currency'].setValue(this.companyData.currency);
          this.form.controls['pan'].setValue(this.companyData.pan);
          this.form.controls['startDate'].setValue({
            year: this.companyData.startDate.getFullYear(),
            month: this.companyData.startDate.getMonth(),
            day: this.companyData.startDate.getDate(),
          });
          this.form.controls['endDate'].setValue({
            year: this.companyData.endDate.getFullYear(),
            month: this.companyData.endDate.getMonth(),
            day: this.companyData.endDate.getDate(),
          });
        }
      });
  }

  onSubmit(user) {
    if (this.logoError === true || this.signatureError === true) {
      return;
    }
    user.startDate = new Date(
      user.startDate.year,
      user.startDate.month,
      user.startDate.day
    ).getTime();
    user.endDate = new Date(
      user.endDate.year,
      user.endDate.month,
      user.endDate.day
    ).getTime();
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        this._toastrService.typeWarning('Processing the data');
        user['companyDataId'] = this.companyDataId;

        this._gatewayService
          .editCompanyDetails(user, this.paramId, this.ownerName)
          .subscribe((data: IData) => {
            this.allowClick = false;
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
              this._toastrService.typeInfo(
                'Redirecting to Gateway page',
                'Info'
              );
              this.router.navigate(['/gateway']);
            } else {
              this.resetDateFormat(user);
              this._toastrService.typeError('Error', data.message);
            }
          });
      } else {
        this.resetDateFormat(user);
        return;
      }
    });
  }
  resetDateFormat(user) {
    user.startDate = new Date(user.startDate);
    this.form.controls['startDate'].setValue({
      year: user.startDate.getFullYear(),
      month: user.startDate.getMonth(),
      day: user.startDate.getDate(),
    });
    user.endDate = new Date(user.endDate);
    this.form.controls['endDate'].setValue({
      year: user.endDate.getFullYear(),
      month: user.endDate.getMonth(),
      day: user.endDate.getDate(),
    });
  }
  // this.form.controls[fileField].setErrors({ incorrect: true });
  onFileChange(event, fileField) {
    fileField === 'logo'
      ? (this.logoError = false)
      : (this.signatureError = false);
    const reader = new FileReader();
    if (event.target.files[0].size < 200000) {
      if (event.target.files && event.target.files.length > 0) {
        this.form.get(fileField).setValue(event.target.files[0]);
        fileField === 'logo'
          ? (this.logoFileName = event.target.files[0].name)
          : (this.sigFileName = event.target.files[0].name);
      }
    } else {
      if (fileField === 'logo') {
        this.logoError = true;
        this.sigFileName = 'No File choosen';
      } else {
        this.signatureError = true;
        this.logoFileName = 'No File choosen';
      }
    }
  }
}

interface IData {
  success: boolean;
  message: string;
}
