import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GatewayService } from './../service/gateway.service';
import { ToastrService } from './../../../utilities/toastr.service';
import { DateValidator } from '../../../shared/validators/dateValidator';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import { StateVaribles } from './../../../shared/forms/States';

@Component({
  selector: 'app-add-company',
  templateUrl: './addCompany.component.html',
  styleUrls: ['./addCompany.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  public form: FormGroup;
  public allowClick: Boolean = true;
  public stateList: Array<string>;
  public logoError: Boolean = false;
  public signatureError: Boolean = false;

  public sigFileName: String = 'No File Choosen.';
  public logoFileName: String = 'No File Choosen.';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    public _gatewayService: GatewayService,
    public fb: FormBuilder,
    private router: Router,
    public _toastrService: ToastrService,
    public _stateVariables: StateVaribles
  ) {
    this.stateList = this._stateVariables.stateListArray;
  }

  ngOnInit() {
    this.form = this.fb.group({
      companyName: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),

      pan: new FormControl('', [
        patternValidator(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
      ]),

      address: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-]+$/),
        Validators.maxLength(20),
      ]),

      city: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
        Validators.maxLength(20),
      ]),

      state: new FormControl('', [Validators.required]),

      gstin: new FormControl('', [
        Validators.required,
        patternValidator(
          /\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}/
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

  onSubmit(user) {
    this._toastrService.typeWarning('Processing the data');
    if (this.logoError === true || this.signatureError === true) {
      return;
    }
    user.pan = user.pan.toLowerCase();
    user.gstin = user.gstin.toLowerCase();
    user.startDate = new Date(
      user.startDate.year,
      user.startDate.month,
      user.startDate.day
    );
    user.endDate = new Date(
      user.endDate.year,
      user.endDate.month,
      user.endDate.day
    );

    this._gatewayService.createNewCompany(user).subscribe((data: IData) => {
      this.allowClick = false;
      if (data.success) {
        this._toastrService.typeSuccess('success', 'Data successfully added');
        this._toastrService.typeInfo('Redirecting to Gateway page', 'Info');
        this.router.navigate(['/gateway']);
      } else {
        this._toastrService.typeError('Error', data.message);
      }
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
