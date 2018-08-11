import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DashboardService } from './service/dashboard.service';
import { ActivatedRoute } from '@angular/router';
declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Line area chart configuration Starts

  public paramId: string;
  // Line chart configuration Ends
  constructor(
    private route: ActivatedRoute,
    public _dashboardService: DashboardService,
    // public fb: FormBuilder,
    private router: Router // private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.getRouteParam();
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this._dashboardService.setParamId(this.paramId);
    });
  }
}
