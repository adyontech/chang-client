import { Component, ViewChild, OnInit } from '@angular/core';
import { DeleteCompanyService } from './service/deleteCompany.service';
import {
  Router,
  CanActivate,
  ActivatedRoute,
  RouterStateSnapshot,
} from '@angular/router';
import * as alertFunctions from './../../shared/data/sweet-alerts';
import { Routes, RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './deleteCompany.component.html',
  styleUrls: ['./deleteCompany.component.scss'],
})
export class DeleteCompanyComponent implements OnInit {
  public paramId: string;
  public ownerName: string;

  loading = false;
  returnURL: string;
  confirmCompanyName;
  understand: boolean;

  constructor(
    public _dashboardSettingService: DeleteCompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRouteParam();

    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/gateway';
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  deleteCompany() {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        this._dashboardSettingService
          .deleteCompany(this.paramId, this.ownerName)
          .subscribe(res => {
            console.log(res);
            if (res.success) {
              this.router.navigate(['/gateway']);
            }
          });
      } else {
        return;
      }
    });
  }
}
