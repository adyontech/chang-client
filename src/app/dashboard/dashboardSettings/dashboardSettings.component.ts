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


  form: FormGroup;
  loading = false;
  returnURL: string;
  public dataCopy: any;
  userList = [];
  userInfo: any;
  collabAddWriteModel: any;
  writeCollabIdLength: number;
  collabAddReadModel: any;
  readCollabIdLength: number;
  // existingHelper = [];
  writeCollabId: any;
  readCollabId: any;

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
      this.paramId = params.id;
      console.log(this.paramId);
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
    this.dataCopy = this._dashboardSettingService.getCollabList().subscribe(data => {
      this.userInfo = data.json();
      // console.log(this.userInfo);
      this.writeCollabId = this.userInfo.user.writeCollabId;
      this.readCollabId = this.userInfo.user.readCollabId;
      this.writeCollabIdLength = this.userInfo.user.writeCollabId.length;
      this.readCollabIdLength = this.userInfo.user.readCollabId.length;
    });
  }

  collabAddWrite() {
    if (this.collabAddWriteModel === undefined) {
      return;
    } else {
      this._dashboardSettingService.collabAddWrite(this.collabAddWriteModel).subscribe(res => {
        console.log(res.json());
        res = res.json();
        this.getCollabList();
      });
    }
  }

  collabAddRead() {
    if (this.collabAddReadModel === undefined) {
      return;
    } else {
      this._dashboardSettingService.collabAddRead(this.collabAddReadModel).subscribe(res => {
        console.log(res.json());
        this.getCollabList();
      });
    }
  }
}
