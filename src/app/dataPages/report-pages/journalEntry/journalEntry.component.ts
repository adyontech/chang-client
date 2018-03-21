import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
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

  incomingData: Array<string> = [];
  form: FormGroup;
  public dataCopy: any;
  public paramId: string;

  public accountType: Array<string> = ['All', 'Dr', 'Bank'];

  constructor(
    private route: ActivatedRoute,
    public _journalEntryService: JournalEntryService,
    public fb: FormBuilder,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.getRouteParam();
    this.getIncomingData(this.paramId);
  }

  getRouteParam() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.paramId = params.id;
      //   this._cashAtBankService.setParamId(this.paramId)
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
    console.log(item);
  }
  open(content, editId) {
    this.editContentId = editId;
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getIncomingData(compName) {
    this.dataCopy = this._journalEntryService
      .getIncomingData(compName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        console.log(data.contraData);
        this.incomingData = data.contraData;
        console.log(data.totalSum);
      });
  }

  deleteEntry(id) {
    console.log(id);
    this._journalEntryService
      .deleteEntry(id, this.paramId)
      // .map(response => response.json())
      .subscribe(data => {
        console.log(data);
      });
  }
}
