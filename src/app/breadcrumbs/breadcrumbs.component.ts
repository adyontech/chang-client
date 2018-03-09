import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  // Demo steps array:
  // [{name: 'Ledger'}, {name: 'Forms', link:'/form/'}, ...]
  // Goes from 0th element as the current page, and the next elements to be the predecessors of the previous.

  goToPreviousStep: Function;

  @Input() steps: Array<any>;

  constructor(private breadcrumbsService: BreadcrumbsService) { }

  ngOnInit() {
    this.goToPreviousStep = () => {
      const link: string = this.steps[1].link;
      window.location.href = link;
    }

    this.goToPreviousStep.bind(this);
    this.breadcrumbsService.setAsResponder(this.goToPreviousStep);
  }

}
