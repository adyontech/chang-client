import { Component, OnInit } from '@angular/core';
import { MeService } from './service/me.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-me-profile',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeProfileComponent implements OnInit {
  user: any;
  bio;
  accountType;
  email;
  phoneNo;
  profileUpdated;
  readCollabId;
  writeCollabId;
  userName;
  plan;
  constructor(public _meService: MeService, private router: Router) {}

  ngOnInit() {
    this.fetchDetails();
  }
  fetchDetails() {
    this._meService.fetchDetails().subscribe(res => {
      this.user = res.json().user;
      console.log(this.user);
      this.bio = this.user.bio;
      this.plan = this.user.accountType.plan;
      this.email = this.user.email;
      this.phoneNo = this.user.phoneNo;
      this.profileUpdated = this.user.profileUpdated;
      this.readCollabId = this.user.readCollabId;
      this.writeCollabId = this.user.writeCollabId;
      this.userName = this.user.userName;
    });
  }
}
