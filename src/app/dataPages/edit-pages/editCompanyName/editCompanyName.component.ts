import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditCompanyNameService } from './service/editCompanyName.service';
import { ToastrService } from '../../../utilities/toastr.service';
import { StateVaribles } from '../../../shared/forms/States';
import * as alertFunctions from '../../../shared/data/sweet-alerts';

@Component({
  selector: 'app-edit-company',
  templateUrl: './editCompanyName.component.html',
  styleUrls: ['./editCompanyName.component.scss'],
})
export class EditCompanyNameComponent implements OnInit {
  public paramId: string;
  public ownerName: string;

  loading = false;
  returnURL: string;
  confirmCompanyName;
  understand: boolean;

  constructor(
    private route: ActivatedRoute,
    public _editCompanyNameService: EditCompanyNameService,
    public fb: FormBuilder,
    private router: Router,
    public _toastrService: ToastrService,
    public _stateVariables: StateVaribles
  ) {}

  ngOnInit() {
    this.getRouteParam();
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }
  editCompany() {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        this._editCompanyNameService
          .editCompany(this.paramId, this.ownerName)
          .subscribe(res => {
            console.log(res);
            if (res.success) {
              // this.router.navigate(['/gateway']);
            }
          });
      } else {
        return;
      }
    });
  }
}
