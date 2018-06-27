import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { LedgerService } from './../ledger/service/ledger.service';
import { UnderGroupsService } from './service/underGroup.service';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import { ToastrService } from './../../../utilities/toastr.service';
@Component({
  selector: 'app-undergroup',
  templateUrl: './undergroup.component.html',
  styleUrls: ['./undergroup.component.scss'],
})
export class UnderGroupComponent implements OnInit {
  public paramId: string;
  public ownerName: string;
  public form: FormGroup;
  public underHeadArray = [
    'revenue (CR)',
    'expenses (DR)',
    'sales (CR)',
    'purchases (DR)',
    'asset (DR)',
    'liabilities (CR)',
  ];

  breadcrumbs = [];
  constructor(
    private route: ActivatedRoute,
    public _ledgerService: LedgerService,
    public _underGroupsService: UnderGroupsService,
    public fb: FormBuilder,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.form = this.fb.group({
      underHead: new FormControl('', [Validators.required]),
      groupName: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
      ]),
      type: [''],
    });
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
    this.breadcrumbs = [
      { name: 'Undergroup' },
      {
        name: 'Dashboard',
        link: `/${this.ownerName}/${this.paramId}/dashboard`,
      },
    ];
  }
  setType(value) {
    console.log(value);
    let types = '';
    if (
      value === 'sales (CR)' ||
      value === 'revenue (CR)' ||
      value === 'liabilities (CR)'
    ) {
      types = 'CR';
    } else {
      types = 'DR';
    }
    this.form.patchValue({
      type: types,
    });
  }

  onSubmit(user) {
    console.log(user);
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        this._underGroupsService
          .createNewUnderGroup(user, this.paramId, this.ownerName)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
            } else {
              this._toastrService.typeError('Error', data.message);
            }
          });
      }
    });
  }
}
