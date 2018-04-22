import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Set toastr container ref configuration for toastr positioning on screen
  constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
    // console.log(
    //   '%c%s',
    //   'color: green; background: cyan; font-size: 32px;',
    //   'Well aadii104 is trying to make things better here,
    // let him know him you are looking for something ( try not to start somehthing your own)'
    // );
  }
}
