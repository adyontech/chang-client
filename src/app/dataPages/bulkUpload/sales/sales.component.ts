import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { SalesBulkMainService } from '../yup.service'; // for everything
import * as yup from 'yup';
type AOA = any[][];

@Component({
  selector: 'app-bulk-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesBulkComponent implements OnInit {
  public form: FormGroup;
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
  schema = yup.array().of(
    yup.object().shape({
      invoiceNumber: yup
        //   .string()
        //   .required()
        //   .matches(/^\d+$/, { message: 'regex didnt work' })
        .mixed()
        .oneOf(['jimmy', '42'], 'please choose one the ledgers')
        .required('invoice number is required.'),
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

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    config: NgbTabsetConfig,
    public _salesBulkMainService: SalesBulkMainService
  ) {
    config.justify = 'center';
    config.type = 'pills';
  }
  ngOnInit() {
    this.form = this.fb.group({
      invoiceNumber: [''],
      vehicleNumber: [''],
      partyName: [''],
      salesLedgerName: [''],
      saleType: [''],
      supplyPlace: [''],
      transportationMode: [''],
      nameOfProduct: [''],
      qty: [''],
      units: [''],
      rate: [''],
      subAmount: [''],
      gstRate: [''],
      amount: [''],
      narration: [''],
      attachment: [''],
      date: [''],
      grandTotal: [''],
    });
  }

  loadPage(page: number) {
    this.formatedValue = this.data.slice(
      (page - 1) * 100,
      (page - 1) * 100 + 100
    );
  }

  mappingTypeSelection(value) {
    console.log(value);
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
    console.log(Date.now);
    this.jsonValidatoErrorMessage = '';

    console.log(this.finalUploadObject);

    this.schema
      .validate(this.finalUploadObject)
      .then(c => {
        console.log(c);
        this.disableSubmit = false;
      })
      .catch(err => {
        console.log(err);
        console.log();
        this.jsonValidatoErrorMessage = `Field Name: "${
          err.params.value
        }" Error: ${err.message}`;
      });
  }
  matchAndValidate(val) {
    console.log(val);
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

  directValidate() {
    for (const key in this.knownFieldVal) {
      if (this.knownFieldVal.hasOwnProperty(key)) {
        this.firstRow.map(el => {
          if (this.knownFieldVal[key] === el) {
            this.firstRow[this.firstRow.indexOf(el)] = key;
          }
        });
      }
    }
    this.convertToJson();
  }
}
