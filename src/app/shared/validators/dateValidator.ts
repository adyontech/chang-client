import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class DateValidator {
  constructor() {}

  static datevalidator(c: FormControl) {
    if (typeof c.value === 'object' && c.value !== null) {
      const dateString = c.value.day + '.' + c.value.month + '.' + c.value.year;
      const dateRegEx = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{4}$/);
      return dateRegEx.test(dateString) ? null : { datevalidator: true };
    } else {
      return { datevalidator: true };
    }
  }
}
