import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PassForgotService } from './service/forgot-password-page.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { any } from 'codelyzer/util/function';
import { emailValidator, passwordValidator } from '../signup/signup.validators';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  form: FormGroup;
  loading = false;
  returnURL: string;
  sucessShow: Boolean = false;
  errorShow: Boolean = false;
  netErrorShow: Boolean = false;
  successMessage: String;
  errorMessage: String;

  constructor(
    public _passForgotService: PassForgotService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fillForm();
    // this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/gateway/addcompany';
  }

  fillForm() {
    this.form = this.fb.group({
      email: [''],
    });
  }
  // On submit click, reset form fields
  onSubmit(user) {
    this._passForgotService.validateUser(user).subscribe(
      res => {
        if (res.success === true) {
          this.sucessShow = true;
          this.errorShow = false;
          this.netErrorShow = false;
          console.log(res.message)
          this.successMessage = res.message;
        } else {
          this.errorShow = true;
          this.sucessShow = false;
          this.netErrorShow = false;
          this.successMessage = res.message;
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
