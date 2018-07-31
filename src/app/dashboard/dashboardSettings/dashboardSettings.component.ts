import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from '../../utilities/toastr.service';
import { DashboardSettingService } from './service/dashboardSettings.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboardSettings.component.html',
  styleUrls: ['./dashboardSettings.component.scss'],
})
export class DashboardSettingsComponent implements OnInit {
  public paramId: string;
  public ownerName: string;

  form: FormGroup;
  loading = false;
  returnURL: string;
  public dataCopy: any;
  userList = [];
  userInfo: any;
  collabAddWriteModel: any;
  readManagersLength: number;
  collabAddReadModel: any;
  writeManagersLength: number;
  // existingHelper = [];
  readManagers: any;
  writeManagers: any;

  constructor(
    public _dashboardSettingService: DashboardSettingService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.getUsers();
    this.getCollabList();
    // this.fillForm();

    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/gateway';
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  getUsers() {
    this.dataCopy = this._dashboardSettingService.getUsers().subscribe(data => {
      data.json().user.map(el => {
        this.userList.push({ id: el.username, name: el.email });
        this.userList = [...this.userList];
      });
    });
  }

  getCollabList() {
    this.dataCopy = this._dashboardSettingService
      .getCollabList(this.paramId, this.ownerName)
      .subscribe(data => {
        this.userInfo = data.json();
        this.readManagers = this.userInfo.user.readManagers;
        this.writeManagers = this.userInfo.user.writeManagers;
        if (this.readManagers !== undefined) {
          this.readManagersLength = this.userInfo.user.readManagers.length;
        }
        if (this.writeManagers !== undefined) {
          this.writeManagersLength = this.userInfo.user.writeManagers.length;
        }
      });
  }

  collabAddWrite() {
    if (
      this.collabAddWriteModel === undefined ||
      this.collabAddWriteModel === null
    ) {
      return;
    } else {
      this._dashboardSettingService
        .collabAddWrite(this.collabAddWriteModel, this.paramId, this.ownerName)
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
  }

  collabAddRead() {
    if (
      this.collabAddReadModel === undefined ||
      this.collabAddReadModel === null
    ) {
      return;
    } else {
      this._dashboardSettingService
        .collabAddRead(this.collabAddReadModel, this.paramId, this.ownerName)
        .subscribe(res => {
          this.getCollabList();
        });
    }
  }

  removeHelper(id, role) {
    if (role === 'write') {
      this._dashboardSettingService
        .removeWriteHelper(id, role, this.paramId, this.ownerName)
        .subscribe(res => {
          this.getCollabList();
        });
    } else {
      this._dashboardSettingService
        .removeReadHelper(id, role, this.paramId, this.ownerName)
        .subscribe(res => {
          this.getCollabList();
        });
    }
  }
}
