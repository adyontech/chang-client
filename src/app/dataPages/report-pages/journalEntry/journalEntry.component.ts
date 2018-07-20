import { Component, Input, ViewChild, OnInit } from '@angular/core';

import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { JournalEntryService } from './service/journalEntry.service';

declare var $: any;

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journalEntry.component.html',
  styleUrls: ['./journalEntry.component.scss'],
})
export class JournalEntryComponent implements OnInit {
  closeResult: string;
  editContentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;

  public accountTypeModel = 'All';
  public incomingData: Array<string> = [];
  public dataCopy: any;
  public paramId: string;
  public ownerId: string;

  public accountType: Array<string> = ['All', 'Dr', 'Cr'];

  constructor(
    private route: ActivatedRoute,
    public _journalEntryService: JournalEntryService,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.getRouteParam();
    this.onAccSelect('All');
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      this.ownerId = params.owner;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onAccSelect(item: any): void {
    if (item === 'All') {
      this.getAllIncomingData();
    } else {
      // type Activity = typeof Mydata;
      this.getIncomingData(item);
    }
  }
  open(content, editId) {
    this.editContentId = editId;
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getIncomingData(selectionValue) {
    this.dataCopy = this._journalEntryService
      .getIncomingData(selectionValue, this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        this.incomingData = data.journalData;
        this.onAccSelect('All');
      });
  }

  getAllIncomingData() {
    this.dataCopy = this._journalEntryService
      .getAllIncomingData(this.paramId, this.ownerId)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.journalData;
      });
  }

  deleteEntry(id) {
    this._journalEntryService
      .deleteEntry(id, this.paramId)
      // .map(response => response.json())
      .subscribe(data => {});
  }
}
interface MyData {
  commonJournalModel: string;
  date: string;
  deleteLedgerID: any;
  file: string;
  journalNumber: string;
  narration: string;
  particularsData: any;
  voucherModelName: string;
}
