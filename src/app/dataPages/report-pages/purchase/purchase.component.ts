import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from "./service/purchase.service";
@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})

export class PurchaseComponent implements OnInit {

    paramId: string;

    constructor(private route: ActivatedRoute, public _purchaseService: PurchaseService) {
        this.route.params.subscribe(params => this.paramId = params.id);
    }

    ngOnInit() {
    }

}