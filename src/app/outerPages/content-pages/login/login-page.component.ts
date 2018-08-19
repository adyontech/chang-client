import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoginService } from './service/login-page.service';
import {
  Router,
  CanActivate,
  ActivatedRoute,
  RouterStateSnapshot,
} from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { any } from 'codelyzer/util/function';
import { emailValidator, passwordValidator } from '../signup/signup.validators';
import { NgClass } from '@angular/common';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./../signup/signup.component.scss'],
})
export class LoginPageComponent implements OnInit {
  // @ViewChild('f') loginForm: NgForm;

  form: FormGroup;
  loading = false;
  returnURL: string;
  sucessShow: Boolean = false;
  errorShow: Boolean = false;
  netErrorShow: Boolean = false;
  successMessage: String;
  errorMessage: String;

  constructor(
    public _loginService: LoginService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this._loginService.logOut();
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
  // this._gatewayService.createNewCompany(user).subscribe((data: IData) => {
  //   this.allowClick = false;
  //   if (data.success) {
  // On submit button click
  onSubmit(user) {
    this._loginService.validateUser(user).subscribe(
      data => {
        if (data.success === true) {
          this.sucessShow = true;
          this.errorShow = false;
          this.netErrorShow = false;
          this.successMessage = data.message;
        } else {
          this.errorShow = true;
          this.sucessShow = false;
          this.netErrorShow = false;
          this.successMessage = data.message;
        }
      },
      error => {
        this.sucessShow = false;
        this.errorShow = false;
        this.netErrorShow = true;
      }
    );
  }
  closeSuccessAlert() {
    this.sucessShow = false;
  }
  closeErrorAlert() {
    this.errorShow = false;
  }
  closeNetErrorAlert() {
    this.netErrorShow = false;
  }
}
