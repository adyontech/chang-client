import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { LedgerService } from './../ledger/service/ledger.service';
import { UnderGroupsService } from './service/underGroup.service';
declare var $: any;

@Component({
  selector: 'app-undergroup',
  templateUrl: './underGroup.component.html',
  styleUrls: ['./underGroup.component.scss'],
})
export class UnderGroupComponent implements OnInit {
  form: FormGroup;
  selectedIndex = 1;

  constructor(
    private route: ActivatedRoute,
    public _ledgerService: LedgerService,
    public _underGroupsService: UnderGroupsService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      groupName: [''],
      underHead: [''],
      type: [''],
    });
  }

  onSubmit(user) {
    this._underGroupsService.createNewUnderGroup(user).subscribe(data => {
    });
  }
}
