import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { JournalEntryService } from './service/journalEntry.service';
import { IMyDpOptions } from 'mydatepicker';
import { BsModalComponent, BsModalBodyComponent } from 'ng2-bs3-modal';
declare var $: any;

@Component({
	selector: 'app-journalEntry',
	host: { '(window:keydown)': 'hotkeys($event)' },
	templateUrl: './journalEntry.component.html',
	styleUrls: ['./journalEntry.component.scss'],
})
export class JournalEntryComponent implements OnInit {
	form: FormGroup;
	dataCopy: any;
	paramId: string;
	totalAmount: number;
	debitSum: number;
	creditSum: number;
	@ViewChild('moodal') moodal: BsModalComponent;
	open() {
		this.moodal.open();
	}

	constructor(
		private route: ActivatedRoute,
		public _journalEntryService: JournalEntryService,
		public fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit() {
		this.getLedgerUGNames();
		this.form = this.fb.group({
			journalNumber: [''],
			date: [''],
			narration: [''],
			particularsData: this.fb.array([]),
			file: [''],
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
			drcr: [''],
			debitAmount: [''],
			creditAmount: [''],
		});
	}
	addParticular() {
		// this.totalSum();
		const control = <FormArray>this.form.controls['particularsData'];
		const addCtrl = this.initParticular();
		control.push(addCtrl);
	}
	removeParticular(i: number) {
		// this.totalSum();
		const control = <FormArray>this.form.controls['particularsData'];
		control.removeAt(i);
	}

	get formData() {
		return <FormArray>this.form.get('particularsData');
	}

	getLedgerUGNames() {
		this.dataCopy = this._journalEntryService
			.getLedgerUGNames()
			.map(response => response.json())
			.subscribe(data => {
				this.ledgerList = this.ledgerList.concat(data.ledgerData);
			});
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

	public resetDrCr(value: any, indexValue): void {
		let particularsData = <FormArray>this.form.controls['particularsData'];
		let array = particularsData.at(indexValue);
		array.patchValue({
			debitAmount: '',
			creditAmount: '',
		});
	}

	totalSum() {
		var formControls = this.form.controls.particularsData['controls'];
		this.debitSum = 0;
		this.creditSum = 0;
		for (let i = 0; i < formControls.length; i++) {
			let debitAmount = formControls[i].controls.debitAmount.value;
			let creditAmount = formControls[i].controls.creditAmount.value;

			if (!isNaN(debitAmount) && debitAmount !== '') this.debitSum += parseFloat(debitAmount);
			if (!isNaN(creditAmount) && creditAmount !== '') this.creditSum += parseFloat(creditAmount);
		}
	}

	onSubmit(user) {
		console.log(user);
		this._journalEntryService.createNewEntry(user).subscribe(data => {});
	}
}
