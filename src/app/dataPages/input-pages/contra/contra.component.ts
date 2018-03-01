import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContraService } from "./service/contra.service";
import { IMyDpOptions } from 'mydatepicker';
import { BsModalComponent, BsModalBodyComponent } from "ng2-bs3-modal";
declare var $: any;

@Component({
	selector: 'app-contra',
	host: { '(window:keydown)': 'hotkeys($event)' },
	templateUrl: './contra.component.html',
	styleUrls: ['./contra.component.scss'],
})
export class ContraComponent implements OnInit {
	form: FormGroup;
	selectedIndex = 1;
	dataCopy: any;
	paramId: string;
	closeResult: string;
	public totalAmount: number;
	@ViewChild('moodal') moodal: BsModalComponent;
	open() {
		this.moodal.open();
	}

	constructor(
		private route: ActivatedRoute,
		public _contraService: ContraService,
		public fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit() {
		this.getAccountNames();
		this.getLedgerUGNames();
		this.form = this.fb.group({
			account: [''],
			chequeNumber: [''],
			contraNumber: [''],
			date: [''],
			drawnOn: [null, Validators.required],
			drawnBank: [''],
			file: [''],
			narration: [''],
			particularsData: this.fb.array([]),
		});
		this.addParticular();
	}

	hotkeys(event) {
		if (event.keyCode == 76 && event.ctrlKey) {
			this.moodal.open();
		}
	}

	// real date picker active from here
	public myDatePickerOptions: IMyDpOptions = {
		// other options...
		dateFormat: 'dd.mm.yyyy',
	};

	public ledgerList: Array<string> = [];
	public accountList: Array<string> = [];

	public value: any = {};
	public _disabledV: string = '0';
	public disabled: boolean = false;
	private get disabledV(): string {
		return this._disabledV;
	}

	private set disabledV(value: string) {
		this._disabledV = value;
		this.disabled = this._disabledV === '1';
	}

	public selected(value: any): void {
		console.log('Selected value is: ', value);
	}

	public removed(value: any): void {
		console.log('Removed value is: ', value);
	}

	// public typed(value: any): void {
	//     console.log('New search input: ', value);
	// }

	public refreshValue(value: any): void {
		this.value = value;
	}

	public showNotification(from, align) {
		const type = ['', 'info', 'success', 'warning', 'danger'];

		var color = Math.floor(Math.random() * 4 + 1);
		$.notify(
			{
				icon: 'pe-7s-gift',
				message: 'Welcome to <b>ProWorkTree </b> - a beautiful freebie for every web developer.',
			},
			{
				type: type[color],
				timer: 1000,
				placement: {
					from: from,
					align: align,
				},
			}
		);
	}

	initParticular() {
		return this.fb.group({
			particulars: ['', Validators.required],
			amount: [''],
		});
	}
	addParticular() {
		this.totalSum();
		const control = <FormArray>this.form.controls['particularsData'];
		const addCtrl = this.initParticular();
		control.push(addCtrl);
	}
	removeParticular(i: number) {
		this.totalSum();
		const control = <FormArray>this.form.controls['particularsData'];
		control.removeAt(i);
	}
	totalSum() {
		var formControls = this.form.controls.particularsData['controls'];
		this.totalAmount = 0;
		for (let i = 0; i < formControls.length; i++) {
			let amount = formControls[i].controls.amount.value;
			if (!isNaN(amount) && amount !== '') this.totalAmount += parseFloat(amount);
			// console.log(this.totalAmount);
		}
	}

	// file upload code here
	handleFileUpload(event) {
		var file: File = event.target.files[0];
		let valid: boolean;

		// valid = this.fileValidator.isValidLogo(file);
		// if (valid && file.size < 200000) {
		//     this.fileValidator.checkPixel(file, (value) => {
		//         if (value) {
		//             this.file_size = false;
		//             this.file_view = true;
		//             this.file = value;
		//         }
		//     });
		// }
		// else {
		//     this.file_size = true;
		// }
	}

	setSelected(id: number) {
		this.selectedIndex = id;
	}

	getLedgerUGNames() {
		this.dataCopy = this._contraService
			.getLedgerUGNames()
			.map(response => response.json())
			.subscribe(data => {
				console.log(data);
				this.ledgerList = this.ledgerList.concat(data.ledgerData);
			});
	}
	getAccountNames() {
		this.dataCopy = this._contraService
			.getAccountNames()
			.map(response => response.json())
			.subscribe(data => {
				console.log(data);
				this.accountList = this.accountList.concat(data.accountNameList);
			});
	}

	get formData() {
		return <FormArray>this.form.get('particularsData');
	}

	onSubmit(user) {
		console.log(user);
		this._contraService.createNewEntry(user).subscribe(data => {});
	}
}
