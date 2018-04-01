import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContributorService } from './service/contributors.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { any } from 'codelyzer/util/function';
import { parse } from 'url';
@Component({
  selector: 'app-contributors-profile',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss'],
})
export class ContributorsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  returnURL: string;
  public dataCopy: any;
  userList = [];
  userInfo: any;
  collabAddWriteModel: any;
  writeCollabIdLength = 0;
  collabAddReadModel: any;
  readCollabIdLength = 0;
  // existingHelper = [];
  writeCollabId: any;
  readCollabId: any;

  constructor(
    public _contributorService: ContributorService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCollabList();
    // this.fillForm();

    this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/gateway';
  }

  getUsers() {
    this.dataCopy = this._contributorService.getUsers().subscribe(data => {
      data.json().user.map(el => {
        this.userList.push({ id: el.username, name: el.email });
        this.userList = [...this.userList];
      });
    });
  }

  getCollabList() {
    this.dataCopy = this._contributorService.getCollabList().subscribe(data => {
      this.userInfo = data.json();
      console.log(this.userInfo);
      this.writeCollabId = this.userInfo.user.writeCollabId;
      this.readCollabId = this.userInfo.user.readCollabId;
      if (this.writeCollabId !== undefined) {
        this.writeCollabIdLength = this.userInfo.user.writeCollabId.length;
      }
      if (this.readCollabId !== undefined) {
        this.readCollabIdLength = this.userInfo.user.readCollabId.length;
      }
    });
  }

  collabAddWrite() {
    if (this.collabAddWriteModel === undefined || this.collabAddWriteModel === null) {
      return;
    } else {
      this._contributorService.collabAddWrite(this.collabAddWriteModel).subscribe((res: IData) => {
        // console.log(JSON.parse(res._body).success);
        console.log(res);
        this._contributorService.typeSuccess(res);
        this.getCollabList();
      });
    }
  }

  collabAddRead() {
    if (this.collabAddReadModel === undefined || this.collabAddReadModel === null) {
      return;
    } else {
      this._contributorService.collabAddRead(this.collabAddReadModel).subscribe(res => {
        console.log(res.json());
        this.getCollabList();
      });
    }
  }

  removeHelper(id, role) {
    console.log(id, role);
    if (role === 'write') {
      this._contributorService.removeWriteHelper(id, role).subscribe(res => {
        console.log(res.json());
      });
    } else {
      this._contributorService.removeReadHelper(id, role).subscribe(res => {
        console.log(res.json());
      });
    }
  }
}

interface IData {
  _body: string;
  status: number;
  success: boolean;
  message: string;
}
