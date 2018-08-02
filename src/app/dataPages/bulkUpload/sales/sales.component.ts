import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import * as YuppSalesSchema from './../yup'; // for everything
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

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    config: NgbTabsetConfig
    // yupp: YuppSalesSchema
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

  convertToJson() {
    this.data[0] = this.firstRow;
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    this.finalUploadObject = <AOA>XLSX.utils.sheet_to_json(ws);
    this.validateData();
  }
  validateData() {
    console.log(this.finalUploadObject);
    YuppSalesSchema.schema
      .validate(this.finalUploadObject)
      .then(c => {
        console.log(c);
      })
      .catch(err => {
        console.log(err);
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
