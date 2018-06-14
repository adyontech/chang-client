import { Component, OnInit } from '@angular/core';
import { LivePreviewService } from './livePreview.service';

@Component({
  selector: 'app-livepreview',
  templateUrl: './livePreview.component.html',
  styleUrls: ['./livePreview.component.scss'],
})
export class LivePreviewComponent implements OnInit {
  public heightToggle: Boolean = false;
  public togglePositinonClass = 'panel panel-chat';
  public sideArrow = 'ft-arrow-left';
  constructor() {}
  ngOnInit() {}

  ToggleClassPreview() {
    console.log('hello');
    this.heightToggle = !this.heightToggle;
  }
  expand() {
    event.stopPropagation();
    console.log('helo');
  }

  TogglePositionClass() {
    event.stopPropagation();
    if (this.togglePositinonClass === 'panel panel-chat') {
      this.sideArrow = 'ft-arrow-right';
      this.togglePositinonClass = 'panel panel-chat panel-chat-left';
    } else {
      this.sideArrow = 'ft-arrow-left';
      this.togglePositinonClass = 'panel panel-chat';
    }
  }
}
