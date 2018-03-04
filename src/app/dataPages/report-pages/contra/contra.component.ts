import { Component, Input, ViewChild,  OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { ContraService } from "./service/contra.service";
import { IMyDpOptions } from 'mydatepicker';
import { BsModalComponent, BsModalBodyComponent } from "ng2-bs3-modal";

declare var $: any;

@Component({
    selector: 'app-contra',
    host: { '(window:keydown)': 'hotkeys($event)' },
    templateUrl: './contra.component.html',
    styleUrls: ['./contra.component.scss']
})


export class ContraComponent implements OnInit {


    contentId: string = "";
    public dateFrom: Date;
    public dateTo: Date;

    @ViewChild('modal')
    modal: BsModalComponent;

    incomingData: Array<string>;
    form: FormGroup;
    public dataCopy: any;
    public paramId: string;
    public closeResult: string;

    constructor(
        private route: ActivatedRoute,
        public _contraService: ContraService,
        public fb: FormBuilder, ) {

    }

    ngOnInit() {
        this.getIncomingData();

        this.modal.onClose.subscribe(this.onClose.bind(this));

    }

    hotkeys(event) {
        if (event.keyCode == 76 && event.ctrlKey) {

            this.modal.open();
        }
    }

    onClose() {
        console.log('Modal Closed');
        this.contentId = "";
    }
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    getIncomingData() {
        this.dataCopy = this._contraService.getIncomingData().map(
            (response) => response.json()
        ).subscribe(
            (data) => {
                console.log(data.contraData)
                this.incomingData = data.contraData;
            })
    }

    editData(id) {
        console.log(id);
        this.contentId = id;
        this._contraService.contentId = id;

    }

    deleteData(id) {


    }

    copyData(id) {


    }


}
