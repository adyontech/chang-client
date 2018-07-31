import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { ToastrService } from '../../../utilities/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from './service/productService.service';
declare var $: any;
@Component({
  selector: 'app-product-service',
  templateUrl: './productService.component.html',
  styleUrls: ['./productService.component.scss'],
})
export class ProductServiceComponent implements OnInit {
  form: FormGroup;
  dataCopy: any;
  paramId: string;
  public ownerName: string;
  public breadcrumbs = [];
  @Input() statePop: string;
  @Input() modalReference: any;

  public items: Array<string> = [
    'BAG-BAGS ',
    'BAL-BALE',
    'BDL-BUNDLES',
    'BKL-BUCKLES ',
    'BOU-BILLION OF UNITS',
    'BOX-BOX',
    'BTL-BOTTLES ',
    'BUN-BUNCHES ',
    'CAN-CANS ',
    'CBM-CUBIC METERS ',
    'CCM-CUBIC CENTIMETERS',
    'CMS-CENTIMETERS ',
    'CTN-CARTONS ',
    'DOZ-DOZENS ',
    'DRM-DRUMS ',
    'GGK-GREAT GROSS ',
    'GMS-GRAMMES ',
    'GRS-GROSS ',
    'GYD-GROSS YARDS ',
    'KGS-KILOGRAMS ',
    'KLR-KILOLITRE',
    'KME-KILOMETRE ',
    'MLT-MILILITRE',
    'MTR-METERS',
    'MTS-METRIC TON',
    'NOS-NUMBERS',
    'PAC-PACKS',
    'PCS-PIECES',
    'PRS-PAIRS',
    'QTL-QUINTAL',
    'ROL-ROLLS',
    'SET-SETS',
    'SQF-SQUARE FEET',
    'SQM-SQUARE METERS',
    'SQY-SQUARE YARDS',
    'TBS-TABLETS',
    'TGM-TEN GROSS',
    'THD - THOUSANDS',
    'TON - TONNES',
    'TUB - TUBES',
    'UGS - US GALLONS',
    'UNT - UNITS',
    'YDS - YARDS',
    'OTH - OTHERS',
  ];

  constructor(
    private route: ActivatedRoute,
    public _productServiceService: ProductServiceService,
    public fb: FormBuilder,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      prsrName: [''],
      type: [''],
      units: [''],
      prsrRate: [''],
      gstRate: [''],
      name: [''],
      hsnaCode: [''],
      qty: [''],
      rate: [''],
    });
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
    this.breadcrumbs = [
      { name: 'Product and service' },
      {
        name: 'Dashboard',
        link: `/${this.ownerName}/${this.paramId}/dashboard`,
      },
    ];
  }
  onSubmit(user) {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        // var newValue = this.form.get('underGroup').value[0].text;
        // this.form.controls['underGroup'].patchValue(newValue);
        this._productServiceService
          .createNewPrsr(user, this.paramId, this.ownerName)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Data successfully added'
              );
              // the code is to check whether the window is a pop-up
              // or not, if pop-up then it will close it.
              if (this.statePop === 'child') {
                this.modalReference.close();
              }
              this.form.reset();
            } else {
              this._toastrService.typeError('Error', data.message);
            }
          });
      } else {
        return;
      }
    });
  }
}
