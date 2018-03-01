import { Component, Input, ViewChild, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { ActivatedRoute } from "@angular/router";
import { PurchaseService } from "./service/purchase.service";
import { IMyDpOptions } from "mydatepicker";
import { BsModalComponent, BsModalBodyComponent } from "ng2-bs3-modal";
declare var $: any;
@Component({
	selector: 'app-purchase',
	templateUrl: './purchase.component.html',
	styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
	form: FormGroup;
	selectedIndex = 1;
	public dataCopy: any;
	public dataCopy1: any;
	public dataCopy2: any;
	private prsrData: any;
	public paramId: string;
	public subTotal: number;
	public totalAmount: number;
	public selectedString: String;
	@ViewChild('moodal') moodal: BsModalComponent;
	open() {
		this.moodal.open();
	}

	constructor(
		private route: ActivatedRoute,
		public _purchaseService: PurchaseService,
		public fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit() {
		this.getPrsrList();
		this.getLedgerUGNames();
		this.getPurchaseUGNames();
		this.form = this.fb.group({
			invoiceNumber: [''],
			vehicleNumber: [''],
			partyName: [''],
			purchaseLedgerName: [''],
			saleType: [''],
			transportationMode: [''],
			supplyPlace: [''],
			particularsData: this.fb.array([]),
			subParticularsData: this.fb.array([]),
			narration: [''],
			file: [''],
			date: [null, Validators.required],
			grandTotal: ['0'],
		});
		this.addParticular();
		this.addSubParticular();
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
	public purchaseList: Array<string> = [];
	public prsrList: Array<string> = [];

	public items: Array<string> = ['Wrocław', 'Zagreb', 'Zaragoza', 'Łódź'];

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

	public selectedprsr(value: any, indexValue): void {
		let unitsValue, gstRatevalue;
		this.prsrData.prsr.forEach(element => {
			if (element.prsrName == value.id) {
				unitsValue = element.units;
				gstRatevalue = element.gstRate;
			}
		});
		let particularsData = <FormArray>this.form.controls['particularsData'];
		let array = particularsData.at(indexValue);
		array.patchValue({
			units: unitsValue,
			gstRate: gstRatevalue,
		});
	}

	public refreshValue(value: any): void {
		this.value = value;
	}
	get formData() {
		return <FormArray>this.form.get('particularsData');
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
			nameOfProduct: [''],
			qty: [''],
			units: [''],
			rate: [''],
			subAmount: [''],
			gstRate: [''],
			amount: [''],
		});
	}
	initSubParticular() {
		return this.fb.group({
			additionalService: [''],
			percent: [''],
		});
	}
	addParticular() {
		this.subSum();
		const control = <FormArray>this.form.controls['particularsData'];
		const addCtrl = this.initParticular();
		control.push(addCtrl);
	}
	addSubParticular() {
		this.subSum();
		const cont = <FormArray>this.form.controls['subParticularsData'];
		const addCtrl = this.initSubParticular();
		cont.push(addCtrl);
	}
	removeParticular(i: number) {
		this.subSum();
		const control = <FormArray>this.form.controls['particularsData'];
		control.removeAt(i);
	}
	removeSubParticular(i: number) {
		this.subSum();
		const cont = <FormArray>this.form.controls['subParticularsData'];
		cont.removeAt(i);
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

	onSubmit(user) {
		user.particularsData.map(el => {
			if (el.subAmount == '') {
				el.subAmount = el.qty * el.rate;
				el.subAmount = el.subAmount.toString();
			}
			if (el.amount == '') {
				el.amount = el.qty * el.rate + el.qty * el.rate * el.gstRate;
				el.amount = el.amount.toString();
			}
		});
		console.log(user);
		this._purchaseService.createNewEntry(user).subscribe(data => {});
	}

	getLedgerUGNames() {
		this.dataCopy = this._purchaseService
			.getLedgerUGNames()
			.map(response => response.json())
			.subscribe(data => {
				// console.log(data);
				this.ledgerList = this.ledgerList.concat(data.ledgerData);
			});
	}

	getPurchaseUGNames() {
		this.dataCopy1 = this._purchaseService
			.getPurchaseUGNames()
			.map(response => response.json())
			.subscribe(data => {
				// console.log(data)
				this.purchaseList = this.purchaseList.concat(data.purchaseLedgerList);
			});
	}

	getPrsrList() {
		this.dataCopy2 = this._purchaseService
			.getprsrList()
			.map(response => response.json())
			.subscribe(data => {
				this.prsrData = data;
				// console.log(data.prsr)
				this.prsrList = data.prsr.map(item => item.prsrName);
			});
	}

	subSum() {
		var formControls = this.form.controls.particularsData['controls'];
		this.subTotal = 0;
		for (let i = 0; i < formControls.length; i++) {
			let qty = formControls[i].controls.qty.value;
			let rate = formControls[i].controls.rate.value;
			let gstRate = formControls[i].controls.gstRate.value;
			let subAmount = formControls[i].controls.subAmount.value;
			let amount = formControls[i].controls.amount.value;
			if (subAmount == '') {
				subAmount = qty * rate;
				subAmount = subAmount.toString();
			}
			if (amount == '') {
				amount = qty * rate + qty * rate * gstRate;
				amount = amount.toString();
			}
			if (!isNaN(amount) && amount !== '') this.subTotal += parseFloat(amount);
			// console.log(this.subAmount);
		}
	}
	totalSum() {
		this.form.patchValue({
			grandTotal: 0,
		});
		var formControls = this.form.controls.subParticularsData['controls'];
		this.totalAmount = 0;
		for (let i = 0; i < formControls.length; i++) {
			let percent = formControls[i].controls.percent.value;
			if (!isNaN(percent) && percent !== '') this.totalAmount += parseFloat(percent);
		}
		if (!isNaN(this.subTotal)) this.totalAmount += this.subTotal;
		// console.log(this.totalAmount);
		this.form.patchValue({
			grandTotal: this.totalAmount,
		});
	}
}
