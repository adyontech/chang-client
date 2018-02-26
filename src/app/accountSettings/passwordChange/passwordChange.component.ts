import { PasswordChangeService } from './service/passwordChange.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-hange-profile',
  templateUrl: './passwordChange.component.html',
  styleUrls: ['./passwordChange.component.scss'],
})
export class PasswordChangeProfileComponent implements OnInit {
  form: FormGroup;

  constructor(public _passwordChangeService: PasswordChangeService, public fb: FormBuilder, private router: Router) {
    console.log();
  }

  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: [''],

      password1: [''],

      password2: [''],
    });
  }

  onSubmit(user) {
    console.log(user);
    if (user.password1 === user.password2) {
    //   console.log('calling api');
      this._passwordChangeService.changePassword(user).subscribe(data => {});
    }
  }
}
