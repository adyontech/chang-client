import { Component, HostListener, OnInit } from '@angular/core';
import { GenerateRoutes } from './sidebar-routes.config';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { ParseId, ParseOwner } from '../../utilities/IdParser';
import { AuthService } from './../auth/auth.service';

declare var $: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public paramId;
  public innerWidth: any;
  public showIconBar: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _authService: AuthService
  ) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.getRouteParam();
    $.getScript("./assets/js/app-sidebar.js");
    $.getScript("./assets/js/vertical-timeline.js");
    this.menuItems = GenerateRoutes(ParseId(), ParseOwner()).filter(
      menuItem => menuItem
    );
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id;
    });
  }
  @HostListener("window:resize", ["$event"])
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
    this._authService.logout();
  }
  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1) {
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
    }
  }
}
