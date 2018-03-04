import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SettingsService } from "./service/settings.service";
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

    paramId: string;

    constructor(private route: ActivatedRoute, public _settingsService: SettingsService) {
    }

    ngOnInit() {
    }

}