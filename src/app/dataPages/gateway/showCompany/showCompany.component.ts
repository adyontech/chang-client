import { Component, OnInit } from '@angular/core';
import { GatewayService } from './../service/gateway.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-show-company',
  templateUrl: './showCompany.component.html',
  styleUrls: ['./showCompany.component.scss'],
})
export class ShowCompanyComponent implements OnInit {
  companyList: Array<string>;
  dataCopy: any;

  constructor(public _gatewayService: GatewayService, private router: Router) {}

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList() {
    this.dataCopy = this._gatewayService.getCompanyList().subscribe(data => {
      this.companyList =  data.json().companyData;
      console.log(this.companyList)
      // console.log('hello gateway service')
    });
  }

  removeCompany(id) {
    console.log('deleting id : ' + id);
    this._gatewayService.removeCompany(id).subscribe(data => {
      // console.log(data);
    });
  }

  viewCompany() {}
}
