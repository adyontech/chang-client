import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
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
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'SheetJS.xlsx';
  salesFields = [
    'TYPE OF SALES',
    'PLACE OF SUPPLY',
    'PARTY NAME',
    'SALES LEDGER',
    'VEHICLE NUMBER',
    'DATE',
    'INVOICE NUMBER',
    'TRANSPORTATION MODE',
  ];
  firstRow = [
    'T mode',
    'gaadi',
    'daaatttee',
    'inv number',
    'pty name',
    'supply wala place',
    'Quan-tity',
    'sale wala pt',
    'sales type',
    'ssuubbaammtt',
    'aammoouunntt',
    'rraaattee',
    'name of prsr',
    'units',
    'ggsstt',
    'naarraattiioonn',
  ];
  constructor(private route: ActivatedRoute, public fb: FormBuilder) {}
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
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: String = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      console.log(wsname);
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws);
      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.data);
      this.firstRow = this.data[0];
    };
    reader.readAsBinaryString(target.files[0]);
  }
  clickwaal() {
    this.data[0] = this.firstRow;
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    /* save data */
    this.data = <AOA>XLSX.utils.sheet_to_json(ws);
    console.log(this.data);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  onSubmit(val) {
    console.log(val);
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        this.firstRow.map(el => {
          if (val[key] === el) {
            // console.log(val[key], el);
            // console.log(this.firstRow.indexOf(el));
            this.firstRow[this.firstRow.indexOf(el)] = key;
          }
        });
      }
    }
    this.clickwaal();
  }
}
