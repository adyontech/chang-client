import { Component, HostListener, OnInit } from '@angular/core';
import { ROUTES } from './settingSidebar-routes.config';
import { RouteInfo } from './settingSidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-setting-sidebar',
  templateUrl: './settingSidebar.component.html',
})
export class SettingSidebarComponent implements OnInit {
  public menuItems: any[];
  public innerWidth: any;
  public showIconBar: Boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, public _authService: AuthService) {}

  ngOnInit() {
    $.getScript('./assets/js/app-sidebar.js');
    $.getScript('./assets/js/vertical-timeline.js');
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.iconShow(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.iconShow(window.innerWidth);
  }
  iconShow(width) {
    if (width < 993) {
      this.showIconBar = true;
    } else {
      this.showIconBar = false;
    }
  }
  logout() {
    console.log('logging out');
    this._authService.logout();
  }
  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf('forms/ngx') !== -1) {
      this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }
  }
}
