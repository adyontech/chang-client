import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { ActivatedRoute } from '@angular/router';
import { EditUnderGroupsService } from './service/editUndergroup.service';
import { patternValidator } from '../../../shared/validators/pattern-validator';
import { ToastrService } from '../../../utilities/toastr.service';
@Component({
  selector: 'app-edit-undergroup',
  templateUrl: './editUndergroup.component.html',
  styleUrls: ['./editUndergroup.component.scss'],
})
export class EditUnderGroupComponent implements OnInit {
  public paramId: string;
  public ownerName: string;
  public form: FormGroup;
  public dataCopy: any;

  public oldUndergroupName: string;
  public editUndergroupId: any;

  public autoFillUgName: Array<string> = [];
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
    public _underGroupsService: EditUnderGroupsService,
    public fb: FormBuilder,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getUgNamesId();
    this.form = this.fb.group({
      selectedUnderGroupName: ['', Validators.required],
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
      { name: 'Edit Undergroup' },
      {
        name: 'Dashboard',
        link: `/${this.ownerName}/${this.paramId}/dashboard`,
      },
    ];
  }

  getUgNamesId() {
    this.dataCopy = this._underGroupsService
      .getUgNamesId(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.autoFillUgName = data.ugData;
      });
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

  autoFillData(value) {
    this.dataCopy = this._underGroupsService
      .autoFillData(value, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data.ugData);
        this.editUndergroupId = data.ugData._id;
        this.oldUndergroupName = data.ugData.groupName;
        this.form.controls['groupName'].setValue(data.ugData.groupName);
        this.form.controls['type'].setValue(data.ugData.type);
        this.form.controls['underHead'].setValue(data.ugData.underHead);
      });
  }

  onSubmit(user) {
    console.log(user);
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        user['_idValue'] = this.editUndergroupId;
        console.log(this.oldUndergroupName);
        user['oldUndergroupName'] = this.oldUndergroupName;
        this._underGroupsService
          .editNewUnderGroup(user, this.paramId, this.ownerName)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
              this.form.reset();
            } else {
              this._toastrService.typeError('Error', data.message);
            }
          });
      } else {
        return;
      }
    });
  }
}
