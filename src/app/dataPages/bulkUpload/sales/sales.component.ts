import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
type AOA = any[][];

import { Router, ActivatedRoute } from '@angular/router';

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
  itemsPerPage: number;
  totalItems: any;
  page: any;
  data: AOA = [];
  formatedValue = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  finalUploadObject;
  firstRow = [];
  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    config: NgbTabsetConfig
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
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.firstRow = this.data[0];
      this.totalIndex = this.data.length;
    };
    reader.readAsBinaryString(target.files[0]);
  }
  convertToJson() {
    this.data[0] = this.firstRow;
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    /* save data */
    this.finalUploadObject = <AOA>XLSX.utils.sheet_to_json(ws);
  }

  onSubmit(val) {
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
  loadPage(page: number) {
    this.formatedValue = this.data.slice(
      (page - 1) * 100,
      (page - 1) * 100 + 100
    );
  }
}
