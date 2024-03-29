import { EditProfileService } from './service/editProfile.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../utilities/toastr.service';

// import { States } from './../../shared/forms/States';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  user: any;
  countryArray = ['India', 'Pakistan', 'Afganistan', ' China'];
  gravatorArray = [
    { id: 1, name: 'tom', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x' },
    { id: 2, name: 'and', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    { id: 3, name: 'jerry', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
  ];
  email: string;
  constructor(
    public _profileEditService: EditProfileService,
    public fb: FormBuilder,
    private router: Router,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.fetchDetails();
    this.form = this.fb.group({
      bio: [''],
      gravator: [''],
      name: [''],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      dob: [''],
      signature: [''],
      // prefetched
      phoneNo: [''],
    });
  }
  fetchDetails() {
    this._profileEditService.fetchDetails().subscribe(res => {
      this.user = res.json().user;
      this.form.get('name').setValue(this.user.userName);
      this.form.get('phoneNo').setValue(this.user.phoneNo);
      this.form.get('gravator').setValue(this.user.gravator);
      this.form.get('address').setValue(this.user.address);
      this.form.get('city').setValue(this.user.city);
      this.form.get('state').setValue(this.user.state);
      this.form.get('country').setValue(this.user.country);
      this.form.get('dob').setValue(this.user.dob);
      this.form.get('signature').setValue(this.user.signature);
    });
  }

  onSubmit(user) {

    this._profileEditService.updateProfile(user).subscribe(data => {
      if (data.success) {
        this._toastrService.typeSuccess('success', 'Profile updated successfully.');
      } else {
        this._toastrService.typeError('Error', data.message);
      }
    });
  }
}
