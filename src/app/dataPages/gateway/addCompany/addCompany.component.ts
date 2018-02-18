import { Component } from '@angular/core';
import { AddCompanyService } from './service/addCompany.service';
import { Object } from 'core-js/library/web/timers';

@Component({
  selector: 'app-add-company',
  templateUrl: './addCompany.component.html',
  styleUrls: ['./addCompany.component.scss'],
  providers: [AddCompanyService],
})
export class AddCompanyComponent {
  constructor() {}
}
