import { element } from 'protractor';
import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from "./../service/payment.service";
import { PopPaymentService } from "./service/popPayment.service";
import { IMyDpOptions } from 'mydatepicker';
import { SelectItem } from 'ng2-select';

declare var $: any;

@Component({
	selector: 'app-popPayment',
	templateUrl: './popPayment.component.html',
	styleUrls: ['./popPayment.component.scss'],
})
export class PopPaymentComponent implements OnInit, DoCheck {
	@Input() contentId: string;

	action: Boolean = true;
	form: FormGroup;
	selectedIndex = 1;
	paramId: string;
	popContnetId: string = '';

	dataContent: Array<string>;
	dataCopy: any;
	constructor(
		private route: ActivatedRoute,
		public _paymentService: PaymentService,
		public _popPaymentService: PopPaymentService,
		public fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit() {
		// this.getIncomingData();
		this.form = this.fb.group({
			paymentNumber: [''],
			date: [''],
			account: [''],
			paymentType: [''],
			paymentThrough: [''],
			chequeNumber: [''],
			drawnOn: [null, Validators.required],
			particularsData: this.fb.array([]),
			narration: [''],
			against: [''],
			file: [''],
		});
		this.addParticular();
	}
	ngDoCheck() {
		if (this.contentId != this.popContnetId) {
			// console.log(`Content Id: ${this.contentId}, Pop Content Id: ${this.popContnetId}`);
			this.popContnetId = this.contentId;
			if (this.popContnetId != '') this.getIncomingData(this.popContnetId);
		}
	}

	// real date picker active from here
	public myDatePickerOptions: IMyDpOptions = {
		// other options...
		dateFormat: 'dd.mm.yyyy',
	};

	public items: Array<string> = [
		'Amsterdam',
		'Antwerp',
		'Athens',
		'Barcelona',
		'Berlin',
		'Birmingham',
		'Bradford',
		'Bremen',
		'Brussels',
		'Bucharest',
		'Budapest',
		'Cologne',
		'Copenhagen',
		'Dortmund',
		'Dresden',
		'Dublin',
		'Düsseldorf',
		'Essen',
		'Frankfurt',
		'Genoa',
		'Glasgow',
		'Gothenburg',
		'Hamburg',
		'Hannover',
		'Helsinki',
		'Kraków',
		'Leeds',
		'Leipzig',
		'Lisbon',
		'London',
		'Madrid',
		'Manchester',
		'Marseille',
		'Milan',
		'Munich',
		'Málaga',
		'Naples',
		'Palermo',
		'Paris',
		'Poznań',
		'Prague',
		'Riga',
		'Rome',
		'Rotterdam',
		'Seville',
		'Sheffield',
		'Sofia',
		'Stockholm',
		'Stuttgart',
		'The Hague',
		'Turin',
		'Valencia',
		'Vienna',
		'Vilnius',
		'Warsaw',
		'Wrocław',
		'Zagreb',
		'Zaragoza',
		'Łódź',
	];

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
		// console.log('Selected value is: ', value);
	}

	public removed(value: any): void {
		// console.log('Removed value is: ', value);
	}

	// public typed(value: any): void {
	//     console.log('New search input: ', value);
	// }

	public refreshValue(value: any): void {
		this.value = value;
	}


	initParticular() {
		return this.fb.group({
			particulars: ['', Validators.required],
			amount: [''],
		});
	}
	addParticular() {
		const control = <FormArray>this.form.controls['particularsData'];
		const addCtrl = this.initParticular();
		control.push(addCtrl);
	}
	removeParticular(i: number) {
		const control = <FormArray>this.form.controls['particularsData'];
		control.removeAt(i);
	}

	get formData() {
		return <FormArray>this.form.get('particularsData');
	}
	// file upload code here
	handleFileUpload(event) {
		let file: File = event.target.files[0];
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

	onSubmit(user, action) {
		user.contentId = this.popContnetId;
		console.log(user);
		if (action == true) {
			console.log('edit');
			this._popPaymentService.editEntry(user).subscribe(data => {});
		} else {
			// console.log(user)
			this._popPaymentService.createNewEntry(user).subscribe(data => {
				// console.log('hello gateway service')
			});
		}
	}
	getIncomingData(id: string) {
		this.dataCopy = this._popPaymentService
			.getData(id)
			.map(response => response.json())
			.subscribe(data => {
				this.dataContent = data.paymentData;
				// console.log(this.dataContent);
				this.fillForm(this.dataContent);
			});
	}

	setDate(value): void {
		console.log(value.substring(5, 7));
		let date = new Date();
		this.form.patchValue({
			date: {
				date: {
					year: value.substring(0, 4),
					month: value.substring(5, 7),
					day: parseInt(value.substring(8, 10)) + 1,
				},
			},
		});
	}

	setDate2(value): void {
		let date = new Date();
		this.form.patchValue({
			drawnOn: {
				date: {
					year: value.substring(0, 4),
					month: value.substring(5, 7),
					day: parseInt(value.substring(8, 10)) + 1,
				},
			},
		});
	}

	fillForm(value) {
		console.log(value[0]);
		this.form.controls['paymentNumber'].patchValue(value[0].paymentNumber);
		this.form.controls['account'].patchValue(value[0].account);
		this.form.controls['paymentType'].patchValue(value[0].paymentType);
		this.form.controls['paymentThrough'].patchValue(value[0].paymentThrough);
		this.form.controls['chequeNumber'].patchValue(value[0].chequeNumber);
		this.form.controls['narration'].patchValue(value[0].narration);
		this.form.controls['against'].patchValue(value[0].against);

		this.setDate(value[0].date);
		this.setDate2(value[0].drawnOn);

		let particularsData = <FormArray>this.form.controls['particularsData'];
		let oldArray = value[0].particularsData;
		oldArray.forEach((element, index) => {
			let array = particularsData.at(index);
			if (!array) {
				particularsData.push(
					this.fb.group({
						particulars: [element.particulars],
						amount: element.amount,
					})
				);
			} else {
				array.patchValue({
					particulars: element.particulars,
					amount: element.amount,
				});
			}
		});
		console.log(this.form);
	}
}
