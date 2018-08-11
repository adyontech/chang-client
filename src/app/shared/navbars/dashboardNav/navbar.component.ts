import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DashboardNavbarService } from './navbar.service';
import { Router } from '@angular/router';
import { ParseId, ParseOwner } from '../../../utilities/IdParser';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class DashboardNavbarComponent implements OnInit {
  public menuItems: any[];
  public paramId;
  public ownerName: string;
  companyList: Array<string>;
  companyData: Array<string>;
  public creator: string;

  toggleClass = 'ft-maximize';
  constructor(
    public _authService: AuthService,
    public _navbarService: DashboardNavbarService,
    private router: Router
  ) {
    this.creator = JSON.parse(window.localStorage.getItem('user')).userName;
  }
  ngOnInit() {
    this.getCompanyNameList();
    this.paramId = ParseId();
    this.ownerName = ParseOwner();
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  getCompanyNameList() {
    this._navbarService.getCompanyNameList().subscribe(data => {
      this.companyData = data.json().data;
      this.companyList = data.json().data.map(el => el.companyName);
    });
  }

  logout() {
    this._authService.logout();
  }

  selected(event) {
    // this.companyData.forEach(element => {
    //   console.log(element.creator)
    // });
    // // JSON.parse(this.companyData).map(el=> el.)
    this.router.navigate(['/']);
  }
}
