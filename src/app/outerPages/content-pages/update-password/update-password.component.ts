import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UpdatePasswordService } from './service/update-password.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { emailValidator, passwordValidator, userNameValidator, phoneValidator } from './signup.validators';
import { Params } from '@angular/router/src/shared';

@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password.component.html',
  styleUrls: ['update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  somevar: any;
  message: String;
  returnURL: string;
  token: string;
  constructor(
    public _updatePasswordService: UpdatePasswordService,
    public _activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.fillForm();
    this._activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.token = params['id'];
    });
  }

  fillForm() {
    this.form = this.fb.group({
      password: ['', passwordValidator],
      password2: ['', passwordValidator],
    });
  }
  onSubmit(user) {
    console.log(user);
    if (user.password === user.password2) {
      this._updatePasswordService.createNewUser(user, this.token).subscribe(
        res => {
          this.somevar = res.message;
          console.log(this.somevar);
          if (res.success === true) {
            this.router.navigate([this.returnURL]);
          }
        },
        error => {
          this.loading = false;
        }
      );
    }
  }
}
