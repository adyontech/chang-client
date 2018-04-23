import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail-subs-profile',
  templateUrl: './mailSubs.component.html',
  styleUrls: ['./mailSubs.component.scss'],
})
export class MailSubsProfileComponent implements OnInit {
  form: FormGroup;
  constructor(public fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({});
  }
}
