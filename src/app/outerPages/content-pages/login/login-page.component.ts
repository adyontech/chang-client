import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './service/login-page.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { any } from 'codelyzer/util/function';
import { emailValidator, passwordValidator } from '../signup/signup.validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  // @ViewChild('f') loginForm: NgForm;

  form: FormGroup;
  loading = false;
  returnURL: string;

  constructor(
    public _loginService: LoginService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this._loginService.logOut();
    this._loginService.checkToken();
    this.fillForm();

    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/gateway';
  }

  fillForm() {
    this.form = this.fb.group({
      password: ['', passwordValidator],
      email: ['', emailValidator],
    });
  }

  // On submit button click
  onSubmit(user) {
    this._loginService.validateUser(user).subscribe(
      res => {},
      error => {
        this.loading = false;
      }
    );
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }
  // On registration link click
  onRegister() {
    this.router.navigate(['signup'], { relativeTo: this.route.parent });
  }
}
