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
  selectedOption;
  public paramId;
  public ownerName: string;
  public dropDownSelect;
  placheloderValue = 'Select Dropdown first';
  menuList: Array<>;
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
      this.menuList = [];
      this.menuList = data.json().data.map(el => el.companyName);
    });
  }
  getLedgerNames() {
    this._navbarService
      .getLedgerUGNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.menuList = [];
        this.menuList = this.menuList.concat(data.ledgerData).reverse();
      });
  }

  logout() {
    this._authService.logout();
  }

  selected(value) {
    console.log(this.ownerName, this.paramId, value);
    if (this.selectedOption === 'company') {
      this.router.navigate([`/${this.ownerName}/${this.paramId}/dashboard`]);
    } else if (this.selectedOption === 'ledger') {
      this.router.navigate(
        [`/${this.ownerName}/${this.paramId}/report/ledger`],
        {
          queryParams: { ledgerName: value },
        }
      );
    }
  }
  actionCompany() {
    this.selectedOption = 'company';
    this.getCompanyNameList();
  }
  actionLedger() {
    this.selectedOption = 'ledger';
    this.getLedgerNames();
    this.placheloderValue = 'Select a ledger';
  }
}
