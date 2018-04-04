import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DeleteCompanyService } from './service/deleteCompany.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import * as alertFunctions from './../../shared/data/sweet-alerts';
import { Routes, RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboardSettings.component.html',
  styleUrls: ['./dashboardSettings.component.scss'],
})
export class DashboardSettingsComponent implements OnInit {
  public paramId: string;
  public ownerName: string;

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
    public _dashboardSettingService: DeleteCompanyService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRouteParam();
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

  deleteCompany() {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        this._dashboardSettingService.deleteCompany(this.paramId, this.ownerName).subscribe(res => {
          console.log(res.json());
        });
      } else {
        return;
      }
    });
  }
}
