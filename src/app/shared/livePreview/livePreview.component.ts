import { Component, OnInit } from '@angular/core';
import { LivePreviewService } from './livePreview.service';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livepreview',
  templateUrl: './livePreview.component.html',
  styleUrls: ['./livePreview.component.scss'],
})
export class LivePreviewComponent implements OnInit {
  public heightToggle: Boolean = true;

  constructor() {}
  ngOnInit() {}

  ToggleClassPreview() {
    console.log('hello');
    this.heightToggle = !this.heightToggle;
  }
}
