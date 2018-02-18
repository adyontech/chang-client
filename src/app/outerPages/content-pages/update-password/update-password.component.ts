import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UpdatePasswordService } from './service/update-password.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { emailValidator, passwordValidator, userNameValidator, phoneValidator } from './signup.validators';

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
  constructor(
    public _updatePasswordService: UpdatePasswordService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.fillForm();
    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/app/login';
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
      this._updatePasswordService.createNewUser(user).subscribe(
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
