import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from './service/signup.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { emailValidator, passwordValidator, userNameValidator, phoneValidator } from './signup.validators';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  loading = false;
  somevar: any;
  message: String;
  returnURL: string;
  sucessShow: Boolean = false;
  errorShow: Boolean = false;
  netErrorShow: Boolean = false;
  successMessage: String;
  errorMessage: String;
  constructor(
    public _signupService: SignupService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    // this._signupService.logOut();
    this._signupService.checkToken();
    this.fillForm();

    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/app/login';
  }

  fillForm() {
    this.form = this.fb.group({
      userName: ['', userNameValidator],
      password: ['', passwordValidator],
      password2: ['', passwordValidator],
      email: ['', emailValidator],
      phoneNo: ['', phoneValidator],
    });
  }
  onSubmit(user) {
    this._signupService.createNewUser(user).subscribe(
      res => {
        if (res.success === true) {
          this.sucessShow = true;
          this.errorShow = false;
          this.netErrorShow = false;
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
