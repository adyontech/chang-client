import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PurchaseReturnService } from "./service/purchaseReturn.service";
@Component({
    selector: 'app-purchaseReturn',
    templateUrl: './purchaseReturn.component.html',
    styleUrls: ['./purchaseReturn.component.scss']
})

export class PurchaseReturnComponent implements OnInit {

    paramId: string;

    constructor(private route: ActivatedRoute, public _purchaseReturnService: PurchaseReturnService) {
        this.route.params.subscribe(params => this.paramId = params.id);
    }

    ngOnInit() {
    }

}