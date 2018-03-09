import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BreadcrumbsService {

  public eventStream = new Subject();
  subscriptions: Array<any> = [];

  setAsResponder(eventResponder) {
    const subscription = this.eventStream.subscribe(eventResponder);
    this.subscriptions.push(subscription);
  }

  goToPreviousStep() {
    this.eventStream.next();
  }

}
