import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../../utilities/toastr.service';
import { SalesBulkService } from './service/sales.service';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import * as XLSX from 'xlsx';
import * as yup from 'yup';
type AOA = any[][];

@Component({
  selector: 'app-bulk-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesBulkComponent implements OnInit {
  public form: FormGroup;
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;
  currentPage = 0;
  pageLimit = 100;
  totalIndex = 0;
  originalWs: XLSX.WorkSheet;
  itemsPerPage: number;
  totalItems: any;
  page: any;
  data: AOA = [];
  formatedValue = [];
  finalUploadObject;
  firstRow = [];
  public ledgerNameArray: Array<string> = [];
  disableSubmit = true;
  mappingTypeModel = '';
  mappingType = ['Personal', 'Bee ocean template'];
  jsonValidatoErrorMessage: String;
  knownFieldVal = {
    invoiceNumber: 'Invoice Number',
    vehicleNumber: 'Vehicle Number',
    partyName: 'Party Name',
    salesLedgerName: 'Sales Ledger Name',
    saleType: 'Sales Type',
    supplyPlace: 'Supply Place',
    transportationMode: 'Transportation Mode',
    nameOfProduct: 'Name of Product',
    qty: 'Qty',
    units: 'Units',
    amount: 'Amount',
    narration: 'Narration',
    grandTotal: 'Grand Total',
    subAmount: 'Sub Amount',
    rate: 'Rate',
    gstRate: 'Gst Rate',
    date: 'Date',
  };
  schema: any;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    config: NgbTabsetConfig,
    public _salesBulkService: SalesBulkService,
    public _toastrService: ToastrService,
    private router: Router
  ) {
    config.justify = 'center';
    config.type = 'pills';
  }
  ngOnInit() {
    this.getRouteParam();
    this.getLedgerNames();
    this.form = this.fb.group({
      invoiceNumber: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      partyName: ['', Validators.required],
      salesLedgerName: ['', Validators.required],
      saleType: ['', Validators.required],
      supplyPlace: ['', Validators.required],
      transportationMode: ['', Validators.required],
      nameOfProduct: ['', Validators.required],
      qty: ['', Validators.required],
      units: ['', Validators.required],
      rate: ['', Validators.required],
      subAmount: ['', Validators.required],
      gstRate: ['', Validators.required],
      amount: ['', Validators.required],
      narration: ['', Validators.required],
      date: ['', Validators.required],
      grandTotal: [''],
    });
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      // this._dashboardSettingService.setParamId(this.paramId);
    });
  }

  loadPage(page: number) {
    this.formatedValue = this.data.slice(
      (page - 1) * 100,
      (page - 1) * 100 + 100
    );
  }

  mappingTypeSelection(value) {
    if (value === 'Bee ocean template') {
      this.autoFill();
    } else {
      this.form.reset();
    }
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: String = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      this.originalWs = wb.Sheets[wsname];
      this.data = <AOA>XLSX.utils.sheet_to_json(this.originalWs, { header: 1 });
      this.firstRow = this.data[0];
      this.totalIndex = this.data.length;
    };
    reader.readAsBinaryString(target.files[0]);
  }

  autoFill() {
    this.form.get('invoiceNumber').setValue('Invoice Number');
    this.form.get('vehicleNumber').setValue('Vehicle Number');
    this.form.get('partyName').setValue('Party Name');
    this.form.get('salesLedgerName').setValue('Sales Ledger Name');
    this.form.get('saleType').setValue('Sales Type');
    this.form.get('supplyPlace').setValue('Supply Place');
    this.form.get('transportationMode').setValue('Transportation Mode');
    this.form.get('nameOfProduct').setValue('Name of Product');
    this.form.get('qty').setValue('Qty');
    this.form.get('units').setValue('Units');
    this.form.get('rate').setValue('Rate');
    this.form.get('subAmount').setValue('Sub Amount');
    this.form.get('gstRate').setValue('Gst Rate');
    this.form.get('amount').setValue('Amount');
    this.form.get('narration').setValue('Narration');
    this.form.get('date').setValue('Date');
    this.form.get('grandTotal').setValue('Grand Total');
  }

  convertToJson() {
    this.data[0] = this.firstRow;
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    this.finalUploadObject = <AOA>XLSX.utils.sheet_to_json(ws);
    this.validateData();
  }
  validateData() {
    this.jsonValidatoErrorMessage = '';
    this.schema
      .validate(this.finalUploadObject)
      .then(c => {
        this.disableSubmit = false;
      })
      .catch(err => {
        this.jsonValidatoErrorMessage = `Field Name: "${
          err.params.value
        }" Error: ${err.message}`;
      });
  }
  matchAndValidate(val) {
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        this.firstRow.map(el => {
          if (val[key] === el) {
            this.firstRow[this.firstRow.indexOf(el)] = key;
          }
        });
      }
    }
    this.convertToJson();
  }

  getLedgerNames() {
    this.dataCopy = this._salesBulkService
      .getLedgerNames(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        if (data.success === true) {
          this.ledgerNameArray = this.ledgerNameArray.concat(data.ledgerData);
          this.schemaDefining();
        }
      });
  }

  schemaDefining() {
    this.schema = yup.array().of(
      yup.object().shape({
        invoiceNumber: yup.string().required(),
        //   .matches(/^\d+$/, { message: 'regex didnt work' })
        // .mixed()
        // .oneOf(this.ledgerNameArray, 'please choose one the ledgers')
        // .required('invoice number is required.'),
        // vehicleNumber: yup.string().required(),
        // partyName: yup.string().required(),
        // salesLedgerName: yup.string().required(),
        // saleType: yup.string().required(),
        // supplyPlace: yup.string().required(),
        // transportationMode: yup.string().required(),
        // nameOfProduct: yup.string().required(),
        // qty:  yup
        //   .number()
        //   .required()
        //   .positive()
        // units:  yup
        //   .number()
        //   .required()
        //   .positive()
        // amount:  yup
        //   .number()
        //   .required()
        //   .positive()
        // narration: yup.string(),
        // grandTotal: yup.
        //   .number()
        //   .required()
        //   .positive()
        // subAmount: yup
        //   .number()
        //   .required()
        //   .positive()
        // rate:  yup
        //   .number()
        //   .required()
        //   .positive()
        // gstRate: yup
        //   .number()
        //   .required()
        //   .positive()
        // date: yup.date().default(function() {
        //   return new Date();
        // }),
      })
    );
  }
  uploadBulk() {
    console.log(this.finalUploadObject);
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        this._toastrService.typeWarning('Processing the data');

        this._salesBulkService.uploadBulk(this.finalUploadObject,  this.paramId, this.ownerName).subscribe(data => {
          if (data.success) {
            this._toastrService.typeSuccess(
              'success',
              'Data successfully added'
            );
            this._toastrService.typeInfo('Redirecting to Gateway page', 'Info');
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
