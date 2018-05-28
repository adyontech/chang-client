import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../auth/auth.service";
import { NavbarService } from "./navbar.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  currentLang = "en";
  public creator: string;

  toggleClass = "ft-maximize";
  constructor(
    public _authService: AuthService,
    public _navbarService: NavbarService
  ) {
    this.creator = JSON.parse(window.localStorage.getItem("user")).userName;
  }
  ngOnInit() {
    // this.getCompanyList();
  }
  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  logout() {
    this._authService.logout();
  }
}
