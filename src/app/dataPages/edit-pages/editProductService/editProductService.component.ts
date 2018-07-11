import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { patternValidator } from './../../../shared/validators/pattern-validator';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import * as alertFunctions from './../../../shared/data/sweet-alerts';
import { ToastrService } from './../../../utilities/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { EditProductServiceService } from './service/editProductService.service';
declare var $: any;
@Component({
  selector: 'app-product-service',
  templateUrl: './editProductService.component.html',
  styleUrls: ['./editProductService.component.scss'],
})
export class EditProductServiceComponent implements OnInit {
  @Input() statePop: string;
  @Input() modalReference: any;
  form: FormGroup;
  dataCopy: any;
  paramId: string;
  ownerName: string;
  breadcrumbs = [{ name: 'Receipt' }, { name: 'Dashboard', link: '/' }];
  public autoFillPrsrName: Array<string> = [];
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
  public oldPrsrName: string;
  public editPrsrId: any;
  constructor(
    private route: ActivatedRoute,
    public _productServiceService: EditProductServiceService,
    public fb: FormBuilder,
    public _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getRouteParam();
    this.form = this.fb.group({
      selectedPrsrName: ['', Validators.required],
      prsrName: new FormControl('', [
        Validators.required,
        patternValidator(/^[a-zA-Z\d-_]+$/),
      ]),
      type: new FormControl('', [Validators.required]),
      units: new FormControl('', [Validators.required]),
      prsrRate: new FormControl('', [
        Validators.required,
        patternValidator(/^[0-9]+([,.][0-9]+)?$/),
      ]),
      gstRate: new FormControl('', [Validators.required]),
      hsnaCode: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        patternValidator(/^[0-9]+([,.][0-9]+)?$/),
      ]),

      qty: new FormControl('', [
        Validators.required,
        patternValidator(/^[0-9]+([,.][0-9]+)?$/),
      ]),
      rate: new FormControl('', [
        Validators.required,
        patternValidator(/^[0-9]+([,.][0-9]+)?$/),
      ]),
      val: new FormControl('', [
        Validators.required,
        patternValidator(/^[0-9]+([,.][0-9]+)?$/),
      ]),
    });
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id;
      this.ownerName = params.owner;
    });
    this.breadcrumbs = [
      { name: 'Edit Product and Service' },
      {
        name: 'Dashboard',
        link: `/${this.ownerName}/${this.paramId}/dashboard`,
      },
    ];
  }

  getPrsrNamesId() {
    this.dataCopy = this._productServiceService
      .getLedgerNamesId(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.autoFillPrsrName = data.ledgerData;
      });
  }

  autoFillData(value) {
    this.dataCopy = this._productServiceService
      .autoFillData(value, this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data.ledgerData);
        this.editPrsrId = data.ledgerData._id;
        this.oldPrsrName = data.ledgerData.ledgerName;
        this.form.controls['prsrName'].setValue(data.ledgerData.prsrName);
        this.form.controls['type'].setValue(data.ledgerData.type);
        this.form.controls['units'].setValue(data.ledgerData.units);
        this.form.controls['prsrRate'].setValue(data.ledgerData.prsrRate);
        this.form.controls['gstRate'].setValue(data.ledgerData.gstRate);
        this.form.controls['hsnaCode'].setValue(data.ledgerData.hsnaCode);
        this.form.controls['qty'].setValue(data.ledgerData.qty);
        this.form.controls['rate'].setValue(data.ledgerData.rate);
        this.form.controls['val'].setValue(data.ledgerData.val);
      });
  }

  onSubmit(user) {
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        user['_idValue'] = this.editPrsrId;
        console.log(this.oldPrsrName);
        user['oldLedgerName'] = this.oldPrsrName;

        if (user.val === '') {
          user.val = user.qty * user.rate;
        }
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
