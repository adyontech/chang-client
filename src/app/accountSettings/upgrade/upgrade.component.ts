import { Component, HostListener, Input, ViewChild, OnInit } from '@angular/core';
import * as alertFunctions from './../../shared/data/sweet-alerts';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UpgradeService } from './service/upgrade.service';
declare var $: any;
@Component({
  selector: 'app-upgrade-profile',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeProfileComponent implements OnInit {
  // public form: FormGroup;
  profileUpdated;
  user: any;
  public paramId: string;
  constructor(
    private route: ActivatedRoute,
    public _upgradeService: UpgradeService,
    public fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.fetchDetails();
  }
  fetchDetails() {
    this._upgradeService.fetchDetails().subscribe(res => {
      this.profileUpdated = res.json().user.profileUpdated;
      // if (!this.profileUpdated) {
      //   alertFunctions.basicAlert('First complete your profile :)');
      //   setTimeout(() => {
    //       this.router.navigate(['/settings/edit']);
    //     }, 3000);
    //   }
    });
  }
}
