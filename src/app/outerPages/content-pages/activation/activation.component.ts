import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivationService } from './service/activation.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router/src/shared';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['activation.component.scss'],
})
export class ActivationComponent implements OnInit {
  somevar: any;
  returnURL: string;
  startChecking: Boolean = true;
  redirectingLogin: Boolean = false;
  redirectingSignup: Boolean = false;
  constructor(
    public _activationService: ActivationService,
    public _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/app/login';
    this._activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      const token = params['id'];
      this._activationService.authentication(token).subscribe(res => {
        this.somevar = res.message;
        console.log(res);
        if (res.success === true) {
          this.startChecking = false;
          this.redirectingLogin = true;
          setTimeout(() => {
            // this.router.navigate(['/app/login']);
          }, 10000);
        } else {
          this.startChecking = false;
          this.redirectingSignup = true;
          setTimeout(() => {
            // this.router.navigate(['/app/signup']);
          }, 10000);
        }
      });
    });
  }
}
