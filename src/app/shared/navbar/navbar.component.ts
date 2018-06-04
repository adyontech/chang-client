import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../auth/auth.service";
import { NavbarService } from "./navbar.service";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Routes, RouterModule, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public paramId: string;
  public ownerName: string;
  companyList: Array<string>;
  currentLang = "en";
  public creator: string;

  toggleClass = "ft-maximize";
  constructor(
    public _authService: AuthService,
    public _navbarService: NavbarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.creator = JSON.parse(window.localStorage.getItem("user")).userName;
  }
  ngOnInit() {
    this.getCompanyNameList();
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split("%20").join(" ");
      this.ownerName = params.owner.split("%20").join(" ");
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  getCompanyNameList() {
    this._navbarService.getCompanyNameList().subscribe(data => {
      this.companyList = data.json().companyData;
    });
  }

  logout() {
    this._authService.logout();
  }

  selected(event) {
    this.getRouteParam();
    this.router.navigate(['/', this.ownerName, this.paramId, 'dashboard']);
  }
}
