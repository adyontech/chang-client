import { Component, OnInit } from '@angular/core';
import { ROUTES } from './settingSidebar-routes.config';
import { RouteInfo } from './settingSidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-setting-sidebar',
  templateUrl: './settingSidebar.component.html',
})
export class SettingSidebarComponent implements OnInit {
  public menuItems: any[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    $.getScript('./assets/js/app-sidebar.js');
    $.getScript('./assets/js/vertical-timeline.js');
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf('forms/ngx') !== -1) {
      this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }
  }
}
