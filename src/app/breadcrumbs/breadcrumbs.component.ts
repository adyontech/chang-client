import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  // Demo steps array:
  // [{name: 'Ledger'}, {name: 'Forms', link:'/form/'}, ...]
  // Goes from 0th element as the current page, and the next elements to be the predecessors of the previous.

  @Input() steps: Array<string>;

  constructor() { }

  yo() {
    alert("YO!");
  }

  ngOnInit() {
  }

}
