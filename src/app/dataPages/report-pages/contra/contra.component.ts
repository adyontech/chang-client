import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { ContraService } from './service/contra.service';

@Component({
  selector: 'app-contra',
  templateUrl: './contra.component.html',
  styleUrls: ['./contra.component.scss'],
})
export class ContraComponent implements OnInit {
  closeResult: string;
  editContentId: String = '';
  public dateFrom: Date;
  public dateTo: Date;

  incomingData: Array<string> = [];
  form: FormGroup;
  public dataCopy: any;
  public paramId: string;

  public accountType: Array<string> = ['All', 'Cash', 'Bank'];

  constructor(private route: ActivatedRoute, private modalService: NgbModal, public _contraService: ContraService) {}

  ngOnInit() {
    this.getRouteParam();
    this.onAccSelect('All');
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
    if (item === 'All') {
      this.getAllIncomingData(this.paramId);
    } else {
      this.getIncomingData(item, this.paramId);
    }
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

  getIncomingData(selectionValue, compaName) {
    this.dataCopy = this._contraService
      .getIncomingData(selectionValue, compaName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.incomingData = data.contraData;
        console.log(this.incomingData);
      });
  }

  getAllIncomingData(compName) {
    this.dataCopy = this._contraService
      .getAllIncomingData(compName)
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
    this._contraService
      .deleteEntry(id, this.paramId)
      // .map(response => response.json())
      .subscribe(data => {
        console.log(data);
      });
  }
}
