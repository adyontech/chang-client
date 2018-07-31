import { Component, OnInit } from '@angular/core';
import { MeService } from './service/me.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbDateCustomParserFormatter } from '../../shared/globalVariables/datePipe';
@Component({
  selector: 'app-me-profile',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeProfileComponent implements OnInit {
  user: any;
  bio;
  gender;
  accountType;
  email;
  phoneNo;
  occupation;
  profileUpdated;
  readCollabId;
  writeCollabId;
  userName;
  plan;
  updatedAt;
  joinedOn;
  website;
  constructor(
    public _meService: MeService,
    private router: Router,
    public _dareFormatter: NgbDateCustomParserFormatter
  ) {}

  ngOnInit() {
    this.fetchDetails();
  }
  fetchDetails() {
    this._meService.fetchDetails().subscribe(res => {
      this.user = res.json().user;
      this.bio = this.user.bio;
      this.plan = this.user.accountType.plan;
      this.updatedAt = this.user.accountType.updatedAt;
      this.email = this.user.email;
      this.website = this.user.website;
      this.occupation = this.user.occupation;
      this.phoneNo = this.user.phoneNo;
      this.profileUpdated = this.user.profileUpdated;
      this.readCollabId = this.user.readCollabId;
      this.writeCollabId = this.user.writeCollabId;
      this.userName = this.user.userName;
      this.joinedOn = this.user.accountType.createdAt;
      this.gender = this.user.gender;
    });
  }
}
