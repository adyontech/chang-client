import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContributorService } from './service/contributors.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { any } from 'codelyzer/util/function';
@Component({
  selector: 'app-contributors-profile',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss'],
})
export class ContributorsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  returnURL: string;

  constructor(
    public _contributorService: ContributorService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this._contributorService.getUsers();
    // this.fillForm();

    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/gateway';
  }

  //   fillForm() {
  //     this.form = this.fb.group({
  //       password: ['', passwordValidator],
  //       email: ['', emailValidator],
  //     });
  //   }

  // On submit button click
  onSubmit(user) {
    // this._loginService.validateUser(user).subscribe(
    //   res => {
    //     if (res.success === true) {
    //       this.router.navigate([this.returnURL]);
    //     }
    //   },
    //   error => {
    //     this.loading = false;
    //   }
    // );
  }
}
