import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from './service//signup.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { emailValidator, passwordValidator, userNameValidator, phoneValidator } from './signup.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  somevar: any;
  message: String;
  constructor(public _signupService: SignupService, public fb: FormBuilder, private router: Router) {

  }
  ngOnInit() {
    this.fillForm();
  }

  fillForm() {
    this.form = this.fb.group({
      userName: ['', userNameValidator],
      password: ['', passwordValidator],
      password2: ['', passwordValidator],
      email: ['', emailValidator],
      phoneNo: ['', phoneValidator],


    })
  }
  onSubmit(user) {
    this._signupService.createNewUser(user)
      .subscribe((res) => {
        this.somevar = res.message;

        console.log(this.somevar)
      })
  }

}
