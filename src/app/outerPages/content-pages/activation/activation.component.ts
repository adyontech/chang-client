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
        console.log(this.somevar);
        if (res.success === true) {
          this.router.navigate([this.returnURL]);
        }
      });
    });
  }
}
