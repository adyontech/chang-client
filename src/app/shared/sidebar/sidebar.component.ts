import { Component, OnInit } from '@angular/core';
import { GenerateRoutes } from './sidebar-routes.config';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { ParseId } from '../../utilities/IdParser';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  paramId

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getRouteParam();
    $.getScript('./assets/js/app-sidebar.js');
    $.getScript('./assets/js/vertical-timeline.js');
    this.menuItems = GenerateRoutes(ParseId()).filter(menuItem => menuItem);
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.paramId = params.id;
    });
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf('forms/ngx') !== -1) {
      this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }
  }
}
