import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { LedgerService } from './../ledger/service/ledger.service';
import { UnderGroupsService } from './service/underGroup.service';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-undergroup',
  templateUrl: './undergroup.component.html',
  styleUrls: ['./undergroup.component.scss'],
})
export class UnderGroupComponent implements OnInit {
  form: FormGroup;
  selectedIndex = 1;
  underHeadArray = ['revenue (CR)', 'expenses (DR)', 'sales (CR)', ' purchases (DR)', 'asset (DR)', 'liabilities (CR)'];
  typeArray = ['Dr', 'Cr'];
  constructor(
    private route: ActivatedRoute,
    public _ledgerService: LedgerService,
    public _underGroupsService: UnderGroupsService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      underHead: [''],
      groupName: [''],
      type: [''],
    });
  }

  onSubmit(user) {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        console.log(user);
        this._underGroupsService.createNewUnderGroup(user).subscribe(data => {
          // console.log('hello gateway service')
        });
      }
    });
  }
}
