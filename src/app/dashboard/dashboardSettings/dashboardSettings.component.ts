import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DashboardSettingService } from './service/dashboardSettings.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { any } from 'codelyzer/util/function';

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
    private router: Router
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
      // console.log(params.id);
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
    this.dataCopy = this._dashboardSettingService.getCollabList(this.paramId, this.ownerName).subscribe(data => {
      this.userInfo = data.json();
      console.log(this.userInfo);
      this.readManagers = this.userInfo.user.readManagers;
      this.writeManagers = this.userInfo.user.writeManagers;
      // console.log(this.writeManagers)
      if (this.readManagers !== undefined) {
        this.readManagersLength = this.userInfo.user.readManagers.length;
      }
      if (this.writeManagers !== undefined) {
        this.writeManagersLength = this.userInfo.user.writeManagers.length;
      }
    });
  }

  collabAddWrite() {
    if (this.collabAddWriteModel === undefined || this.collabAddWriteModel === null) {
      return;
    } else {
      this._dashboardSettingService
        .collabAddWrite(this.collabAddWriteModel, this.paramId, this.ownerName)
        .subscribe(res => {
          console.log(res.json());
          this.getCollabList();
        });
    }
  }

  collabAddRead() {
    if (this.collabAddReadModel === undefined || this.collabAddReadModel === null) {
      return;
    } else {
      this._dashboardSettingService
        .collabAddRead(this.collabAddReadModel, this.paramId, this.ownerName)
        .subscribe(res => {
          console.log(res.json());
          this.getCollabList();
        });
    }
  }

  removeHelper(id, role) {
    console.log(id, role);
    if (role === 'write') {
      this._dashboardSettingService.removeWriteHelper(id, role,  this.paramId , this.ownerName).subscribe(res => {
        console.log(res.json());
        this.getCollabList();
      });
    } else {
      this._dashboardSettingService.removeReadHelper(id, role, this.paramId , this.ownerName).subscribe(res => {
        console.log(res.json());
        this.getCollabList();
      });
    }
  }

}
